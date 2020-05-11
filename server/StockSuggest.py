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

# get all the stocks and percentages for the selected strategies
def get_all(strategy_list):
    stock_percent_list={}
    if(len(strategy_list)==1):
        print("get all....")
        print(strategy_list[0])
        stock_percent_list=get_stock_list(strategy_list[0])
    else:
        for strategy in strategy_list:
            print("get all")
            print(strategy)
            stock_percent_list.update(get_stock_list(strategy))
    return stock_percent_list


stock_suggestions = {
        'Ethical': ('GILD', 'GOOGL', 'NOV', 'PX', 'QCOM'),
        'Growth': ('BIIB', 'AKRX', 'PSXP', 'IPGP', 'NFLX'),
        'Index': ('LNDC', 'LWAY', 'MDLZ', 'RAVE', 'RIBT'),
        'Quality': ('JNJ', 'KO', 'REGN', 'PEP', 'NKE'),
        'Value': ('ALB', 'VIAC', 'BTI', 'CVS', 'AZO','VZ','ALXN'),
    }


def get_stock_list(strategy):
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


def get_52_week_gain(stock_symbol):
    print("stock_symbol")
    print(stock_symbol)
    session = requests.session()
    url = "https://financialmodelingprep.com/api/v3/enterprise-value/"+stock_symbol+"?period=quarter"
    # print(url)
    response = session.get(url, timeout=15)
    return response


def get_change(data):
    # print("data")
    # print(data.json())
    try: 
        stock_data = data.json()
        # print(stock_data)
    except ValueError:
        tempData = { 'error_msg' :'Deserialization Fails.'}
        return tempData

    open = float(stock_data['enterpriseValues'][1]['Stock Price'])
    close= float(stock_data['enterpriseValues'][0]['Stock Price'])
    change=close-open
    return change