# app.py (updated)
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from routes import init_routes
import models  # Import models to ensure classes are defined

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)  # Define db here

init_routes(app)

with app.app_context():
    print("Creating database tables...")
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, port=5000)