import requests

# API_KEY = 'DSJ9W3ZS7A6RWBJC'
# API_BASE_CURRENT = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&apikey={}&symbol={}&interval=1min' \
#                    '&datatype=csv'
# API_BASE_DAILY = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&apikey={}&symbol={}&datatype=csv'

symbol_map = {}

def get_stock_price(stock_symbol):
    print("stock_symbol: " + stock_symbol)
    session = requests.session()
    url = "https://financialmodelingprep.com/api/v3/quote/" + stock_symbol
    # print (url)
    response = session.get(url, timeout=15)
    try:
        stock_data = response.json()
    except ValueError:
        tempData = {'error_msg': 'Deserialization Fails.'}
        return tempData

    print("stock_data")
    print(stock_data)
    price = float(stock_data[0]['price'])
    print("price")
    print(price)
    return price

def get_month(stock_symbol):
    session = requests.session()
    url = "https://financialmodelingprep.com/api/v3/historical-price-full/" + stock_symbol + "?timeseries=30"
    # print (url)
    response = session.get(url, timeout=15)
    try:
        stock_data = response.json()
    except ValueError:
        tempData = {'error_msg': 'Deserialization Fails.'}
        return tempData

    close = float(stock_data['historical'][0]['close'])
    open = float(stock_data['historical'][29]['open'])
    # print("month chnage")
    # print(close-open)
    return close - open


# get all the stocks and percentages for the selected strategies
def get_all(strategy_list):
    stock_percent_list = {}
    response = []
    if (len(strategy_list) == 1):
        print("get all....")
        name = strategy_list[0]
        stock_percent_list = get_stock_list(strategy_list[0])
        return modify_response(stock_percent_list, name)
    else:
        for strategy in strategy_list:
            print("get all")
            name = strategy
            stock_percent_list = get_stock_list(strategy)
            response.append(modify_response(stock_percent_list, name))
        return response


def modify_response(stock_percent_list, strategy_name):
    print("strategy_name")
    print(strategy_name)

    stock_prices = [(float(get_stock_price(name[1])), name[1]) for name in stock_percent_list]

    negative = abs(sum([item[0] for item in stock_percent_list if item[0] < 0])) * 1.5

    for i in range(len(stock_percent_list)):
        stock_percent_list[i] = (stock_percent_list[i][0] + negative, stock_percent_list[i][1])

    sumPriorityScore = sum([stock[0] for stock in stock_percent_list])

    response = {"strategy": strategy_name,
                "sumPriorityScore": sumPriorityScore, "stock": [{"ticker": name[1],
                                                    "priorityScore": name[0],
                                                    "stockPrice": [item[0] for item in stock_prices if item[1] == name[1]][0]} for name in stock_percent_list]}

    print(response)
    return response


stock_suggestions = {
    'Ethical': ('GILD', 'GOOGL', 'NOV', 'QCOM'),
    'Growth': ('BIIB', 'AKRX', 'PSXP', 'IPGP', 'NFLX'),
    'Index': ('LNDC', 'LWAY', 'MDLZ', 'RAVE', 'RIBT'),
    'Quality': ('JNJ', 'KO', 'REGN', 'PEP', 'NKE'),
    'Value': ('ALB', 'VIAC', 'BTI', 'CVS', 'AZO', 'VZ', 'ALXN'),
}


def get_stock_list(strategy):
    print("strategy.....")
    # print(strategy)
    # print(strategy_ratio)
    # define the stocks for each strategy
    stocks = stock_suggestions[strategy]
    # print(stocks) 
    annual_gain = [(float(get_change(get_52_week_gain(name))), name) for name in stocks]
    month_gain = [(float(get_month(name)), name) for name in stocks]

    stock_priority = []
    for x, y in zip(annual_gain, month_gain):
        # print("x y")
        # print(x[0])
        # print(y[0])
        stock_priority.append((0.6 * x[0] + 0.4 * y[0], x[1]))

    # sort
    stock_priority.sort(key=lambda x: x[0], reverse=True)
    print(stock_priority)

    return stock_priority[:3]


def get_52_week_gain(stock_symbol):
    print("stock_symbol")
    print(stock_symbol)
    session = requests.session()
    url = "https://financialmodelingprep.com/api/v3/enterprise-value/" + stock_symbol + "?period=quarter"
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
        tempData = {'error_msg': 'Deserialization Fails.'}
        return tempData

    open = float(stock_data['enterpriseValues'][1]['Stock Price'])
    close = float(stock_data['enterpriseValues'][0]['Stock Price'])
    change = close - open
    return change
