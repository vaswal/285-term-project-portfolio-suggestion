from collections import defaultdict, OrderedDict
import datetime
import numpy as np, numpy.random
import urllib.request as urllib2
import csv
import requests


# API_KEY = 'DSJ9W3ZS7A6RWBJC'
# API_BASE_CURRENT = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&apikey={}&symbol={}&interval=1min' \
#                    '&datatype=csv'
# API_BASE_DAILY = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&apikey={}&symbol={}&datatype=csv'

symbol_map = {}

def get_month(stock_symbol):
    session = requests.session()
    url = "https://financialmodelingprep.com/api/v3/historical-price-full/"+stock_symbol+"?timeseries=30"
    # print (url)
    response = session.get(url, timeout=15)
    try: 
        stock_data = response.json()
    except ValueError:
        tempData = { 'error_msg' :'Deserialization Fails.'}
        return tempData

    close = float(stock_data['historical'][0]['close'])
    open = float(stock_data['historical'][29]['open'])
    # print("month chnage")
    # print(close-open)
    return close-open

# get the current info of the latest stock info from alphavantage
def get_current(stock_symbol):
    session = requests.session()
    url = "https://financialmodelingprep.com/api/v3/company/profile/"+stock_symbol
    # print (url)
    stock_share = session.get(url, timeout=15)
    reader = csv.reader(stock_share)
    next(reader, None)  # skip header: timestamp,open,high,low,close,volume
    latest = next(reader, None)
    stock_current_info = {}
    stock_current_info['stock_symbol'] = stock_symbol
    # timestamp format: 2017-12-15 16:00:00
    stock_trade_datetime = datetime.datetime.strptime(latest[0], '%Y-%m-%d %H:%M:%S')
    # use close price
    stock_latest_price = latest[4]
    # stock_latest_price=stock_share.get_price()
    stock_current_info['stock_latest_price'] = stock_latest_price
    stock_current_info['stock_trade_datetime'] = stock_trade_datetime

    # lazy load symbols map
    if not symbol_map:
        prepare_symbols()
    stock_current_info['stock_exchange'] = symbol_map[stock_symbol][1]
    stock_current_info['stock_company_name'] = symbol_map[stock_symbol][0]
    return stock_current_info


# get all the stocks and percentages for the selected strategies
def get_all(strategy_list):
    stock_percent_list={}
    if(len(strategy_list)==1):
        print("get all....")
        print(strategy_list[0])
        stock_percent_list=get_stock_list(strategy_list[0], 1)
    else:
        for strategy in strategy_list:
            print("get all")
            print(strategy)
            stock_percent_list.update(get_stock_list(strategy, 0.5))
    return stock_percent_list


stock_suggestions = {
        'Ethical': ('GILD', 'GOOGL', 'NOV', 'PX', 'QCOM'),
        'Growth': ('BIIB', 'AKRX', 'PSXP', 'IPGP', 'NFLX'),
        'Index': ('LNDC', 'LWAY', 'MDLZ', 'RAVE', 'RIBT'),
        'Quality': ('JNJ', 'KO', 'REGN', 'PEP', 'NKE'),
        'Value': ('JNJ', 'KO', 'REGN', 'PEP', 'NKE'),
    }


# get the stock list and according percentage for one selected strategy, and the allotment is divided equally
def get_stock_list(strategy, strategy_ratio):
    print("strategy.....")
    # print(strategy)
    # print(strategy_ratio)
    #define the stocks for each strategy
    stocks = stock_suggestions[strategy]
    # print(stocks) 
    annaul_gain = [(float(get_change(get_52_week_gain(name))), name) for name in stocks]
    month_gain = [(float(get_month(name)), name) for name in stocks]
    stock_priority = []
    for x,y in zip(annaul_gain, month_gain):
        # print("x y")
        # print(x[0])
        # print(y[0])
        stock_priority.append((0.6*x[0] +0.4*y[0],x[1]))
       
    #sort
    stock_priority.sort(key=lambda x:x[0],reverse=True)
    print(stock_priority)
   
    return stock_priority[:3]


# investment for each stock info,the value is five days ago(work time, not including weekends)
def get_strategy(stock_list, investment):
    stock_strategy_invest_info = {}
    for stock_symbol in stock_list:
        stock_current_info = get_current(stock_symbol) #get every current stock info
        holding_ratio = stock_list[stock_symbol]
        stock_current_info['holding_ratio'] = float("{0:.4f}".format(holding_ratio))
        stock_current_info['holding_value'] = float("{0:.2f}".format(holding_ratio * investment))
        # fill stock combination of current strategy with current stock info
        stock_strategy_invest_info[stock_symbol] = stock_current_info
    return stock_strategy_invest_info


# get the portfolio total value of the past five days--dict
def get_historical_strategy(stock_list, investment):
    stock_historical_values = defaultdict(float)
    ordered_date = []
    result = []
    for stock_symbol in stock_list:
        historical_info = get_historical(stock_symbol)
        if not ordered_date:
            ordered_date = [itm[0] for itm in historical_info]
        holding_ratio = stock_list[stock_symbol]
        point_price = float(historical_info[0][4])
        for i in range(0, 7):
            stock_historical_values[historical_info[i][0]] += float(historical_info[i][4])\
                                                              / point_price * investment * holding_ratio

    for date in ordered_date:
        dict_json = {}
        dict_json['date'] = date
        dict_json['value'] = float("{0:.2f}".format(stock_historical_values[date]))
        result.append(dict_json)
    return result


def get_52_week_gain(stock_symbol):
    print("stock_symbol")
    print(stock_symbol)
    session = requests.session()
    url = "https://financialmodelingprep.com/api/v3/company/profile/"+stock_symbol
    # print (url)
    response = session.get(url, timeout=15)
    # API_KEY = 'DSJ9W3ZS7A6RWBJC'
    # API_BASE_DAILY = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&apikey={}&symbol={}&datatype=csv'
    # response = urllib2.urlopen(API_BASE_DAILY.format(API_KEY, stock_symbol.upper()))
    return response
    # reader = csv.reader(response.read().decode('utf-8'))
    # next(reader, None)  # skip the header
    # ts_data = [row for row in reader]
    # return ts_data[:1]  # return last data


def get_change(data):
    # print("data")
    # print(data.json())
    try: 
        stock_data = data.json()
    except ValueError:
        tempData = { 'error_msg' :'Deserialization Fails.'}
        return tempData

    change = float(stock_data['profile']['changes'])
    # print("chnage 52")
    # print(change)
    return change