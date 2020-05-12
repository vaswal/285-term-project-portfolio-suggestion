import requests
from flask import jsonify

#since the major indexes does not return real
# get all the stocks and percentages for the selected strategies
def get_major_indexes():
    session = requests.session()
    url = "https://financialmodelingprep.com/api/v3/quotes/index"
    response = session.get(url, timeout=15)
    all_indexes =response.json()
    result = []
    for index in all_indexes:
        major_stocks = ['^GSPC', '^IXIC', '^DJI', '^FCHI', '^RUITR', '^RUT', '^NSEBANK', '^RUA', '^GVZ', '^VXSLV']
        for i in range(0, 10):
            if (index['symbol'] == major_stocks[i]):
                result.append(index)
    return result

