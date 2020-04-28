from flask import Flask
from flask import render_template
from flask import request
import requests
import json
import datetime


app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
          
        tempData ={ 'tickerSymbol':'','full_name':'',
        'stock_price':'','value_change':'',
        'perc_change':'','weekday':'','month':'','day':'','year':''}
        return render_template('home.html',**tempData)

    elif request.method == 'POST':
        #Inputs
        stock_symbol = request.form['symbol']
        try:
            session = requests.session()
            url = "https://financialmodelingprep.com/api/v3/historical-price-full/"+stock_symbol+"?timeseries=1"
            print (url)
            response = session.get(url, timeout=15)

            url_company = "https://financialmodelingprep.com/api/v3/company/profile/"+stock_symbol
            print (url_company)
            response_company = session.get(url_company, timeout=15)

        except:
            tempData = { 'error_msg' :'Network Error'}
            return render_template('home.html',**tempData)

        try: 
            stock_data = response.json()
            stock_company = response_company.json()

        except ValueError:
            tempData = { 'error_msg' :'Deserialization Fails.'}
            return render_template('home.html',**tempData)

        try:
            full_name = stock_company['profile']['companyName']
            stock_price = stock_company['profile']['price']
            value_change = stock_data['historical'][0]['change']
            perc_change = stock_data['historical'][0]['changePercent']
            now = datetime.datetime.today() 
            if (value_change > 0):
                format_value_change = "+" + str(value_change)
            else:
                format_value_change = value_change    
            
            format_stock_symbol = "(" + stock_symbol + ")"

            if(perc_change > 0):
                format_perc_change = "(+" + str(perc_change) + "%)"
            else:
                format_perc_change = "(" + str(perc_change) + "%)"

            tempData ={ 'tickerSymbol': format_stock_symbol,'full_name':full_name,
            'stock_price':stock_price,'value_change':format_value_change,
            'perc_change':format_perc_change,'weekday':now.strftime("%a"),'month':now.strftime("%b"),
            'day':now.strftime("%d"),'time':now.strftime("%X")+" PDT",'year':now.strftime("%Y")}
            return render_template('home.html',**tempData)

        except (IndexError, KeyError, TypeError):
            tempData = { 'error_msg' :'No data found. Please re-check ticker symbol'}
            return render_template('home.html',**tempData)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')