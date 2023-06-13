import os
from flask import jsonify, Flask, request
from flask_restful import Api, Resource
import joblib
from tensorflow import keras
import pandas as pd

app = Flask(__name__)
api = Api(app)


model = keras.models.load_model('Prediction_Feature/DeepLearningModel.h5')


class makeprediction(Resource):
    @staticmethod
    def post():
        posted_data = request.get_json()
        print(posted_data)
        order_item_id = posted_data["order_item_id"]
        quarters = posted_data["quarters"]
        week = posted_data["week"]
        price = posted_data["price"]
        payment_value = posted_data["payment_value"]
        review_score = posted_data["review_score"]

        predictions = model.predict(
            [[order_item_id, quarters, week, price, payment_value, review_score]])[0]
        
        return pd.Series(predictions).to_json(orient='values')[1:-1]


api.add_resource(makeprediction, "/salesRate")  # Ali

########################################################################################
modell = joblib.load("Prediction_Feature/modelregwith99lastone.pkl")


class prediction(Resource):
    @staticmethod
    def post():
        posted_data = request.get_json()
        product_id = posted_data["product_id"]
        price = posted_data["price"]
        payment_value = posted_data["payment_value"]
        review_score = posted_data["review_score"]
        
        predictions = modell.predict([[product_id,price,payment_value,review_score]])[0]

        return jsonify({
            "predictions": predictions
        })


api.add_resource(prediction, "/expect")  # Bakar


@app.route("/request")      
def hello():
    return 'Hello, world From Python'


if __name__ == "__main__":
    app.run(debug=True)
