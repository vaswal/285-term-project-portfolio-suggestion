import requests
from flask import Flask
from flask import request, jsonify
from flask_cors import CORS,cross_origin

from StockSuggest import get_all

app = Flask(__name__)
cors = CORS(app, resources={r"/": {"origins": "http://13.52.97.186:3000/"}})


@app.route('/fullHistory/<ticker>', methods=['GET'])
@cross_origin(origin='13.52.97.186')
def func1(ticker):
    if ticker:
        # Inputs
        stock_symbol = ticker
        session = requests.session()
        url = "https://financialmodelingprep.com/api/v3/historical-price-full/" + stock_symbol
        print(url)
        response = session.get(url, timeout=15)

        try:
            stock_data = response.json()

        except ValueError:
            tempData = {'error_msg': 'Deserialization Fails.'}
            return tempData

        return stock_data

    else:
        return "Error: No id field provided. Please specify an id."


@app.route('/companyProfile/<ticker>', methods=['GET'])
@cross_origin(origin='13.52.97.186')
def func2(ticker):
    if ticker:
        # Inputs
        stock_symbol = ticker
        session = requests.session()
        url = "https://financialmodelingprep.com/api/v3/company/profile/" + stock_symbol
        print(url)
        response = session.get(url, timeout=15)

        try:
            company_profile = response.json()

        except ValueError:
            tempData = {'error_msg': 'Deserialization Fails.'}
            return tempData

        return company_profile

    else:
        return "Error: No id field provided. Please specify an id."

    # @app.route('/stock_suggestion', methods=['POST'])


# def invest():
#     choices = request.args.get('choices', '')
#     print("choices")
#     print(choices)
#     stocklist = get_all(choices)
#     return jsonify(stocklist)


@app.route('/stock_suggestion', methods=['POST'])
@cross_origin(origin='13.52.97.186')
def invest():
    req_data = request.get_json()
    print("req_data")
    print(req_data)

    print("request.form")
    print(request.form)

    print("request")
    print(request)

    choices = req_data['choices']
    print(choices)
    # choices = json.loads(choices)

    stocklist = get_all(choices)
    # stockInfo = get_strategy(stocklist, amount)
    # #pprint(stocklist)
    # stockHistInfo = get_historical_strategy(stocklist, amount)
    return jsonify(stocklist)


@app.route('/portfolio_info', methods=['POST'])
def portfolio_info():
    req_data = request.get_json()
    choices = req_data['tickers']
    print(choices)

    session = requests.session()
    url = "https://financialmodelingprep.com/api/v3/company/profile/" + ",".join(choices)
    # print (url)
    response = session.get(url, timeout=15)
    try:
        stock_data = response.json()
    except ValueError:
        tempData = {'error_msg': 'Deserialization Fails.'}
        return tempData

    print("stock_data")
    print(stock_data)

    return jsonify(stock_data)


# @app.route('/selection', methods=['POST'])
# def return_data():
#     Strategies = request.json['Strategies']
#     Amount = request.json['Amount']

#     response = []
#     amt1 = Amount*0.5
#     amt2 = Amount*0.30
#     amt3 = Amount*0.20
#     responseAmount = []

#     responseAmount.append(amt1)
#     responseAmount.append(amt2)
#     responseAmount.append(amt3)

#     for x in Strategies:
#         if x == "Ethical Investing":
#             response.append(get_stock_quote(ethical_investing))
#         elif x == "Growth Investing":
#             response.append(get_stock_quote(growth_investing))
#         elif x == "Index Investing":
#             response.append(get_stock_quote(index_investing))
#         elif x == "Quality Investing":
#             response.append(get_stock_quote(quality_investing))
#         elif x == "Value Investing":
#             response.append(get_stock_quote(value_investing))
#         else:
#             response.append("Invalid Strategy")

#     # get_stock_quote(value)
#     dict1 = {"strategiesResponse": response, "amountResponse": responseAmount}
#     response=Response(json.dumps(dict1), mimetype='application/json')
#     # response.headers.add("Access-Control-Allow-Origin", "*")
#     return response


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
