from flask import Flask
from flask import render_template
from flask import request,jsonify
import json
import datetime
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/fullHistory/<ticker>', methods=['GET'])
def func1(ticker):
    if ticker:
         #Inputs
        stock_symbol = ticker
        session = requests.session()
        url = "https://financialmodelingprep.com/api/v3/historical-price-full/"+stock_symbol
        print (url)
        response = session.get(url, timeout=15)

        try: 
            stock_data = response.json()

        except ValueError:
            tempData = { 'error_msg' :'Deserialization Fails.'}
            return tempData
        
        return stock_data

    else:
        return "Error: No id field provided. Please specify an id."

    
@app.route('/companyProfile/<ticker>', methods=['GET'])
def func2(ticker):
    if ticker:
         #Inputs
        stock_symbol = ticker
        session = requests.session()
        url = "https://financialmodelingprep.com/api/v3/company/profile/"+stock_symbol
        print (url)
        response = session.get(url, timeout=15)

        try: 
            company_profile = response.json()

        except ValueError:
            tempData = { 'error_msg' :'Deserialization Fails.'}
            return tempData
        
        return company_profile

    else:
        return "Error: No id field provided. Please specify an id."  
       

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')