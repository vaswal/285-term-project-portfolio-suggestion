import requests
from flask import jsonify

#since the major indexes does not return real
# get all the stocks and percentages for the selected strategies
def get_major_indexes():

    print('her')
    session = requests.session()
    url = "https://financialmodelingprep.com/api/v3/quotes/index"
    # print(url)
    response = session.get(url, timeout=15)
    all_indexes =response.json()
    # for index in all_indexes:
    #     if(index['symbol'] == '^GSPC'):
    #         print(index)
    # filtered = filter(major_index, all_indexes)
    result = []
    for index in all_indexes:
        major_stocks = ['^GSPC', '^IXIC', '^DJI']
        for i in range(0, 2):
            if (index['symbol'] == major_stocks[i]):
                result.append(index)
    print(result)
    return result

def major_index(index):
    major_stocks = ['^DJI']
    for i in range (0, 2):
        if(index['symbol'] == major_stocks[i]):
            return True
    # return False
