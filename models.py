print("Models loading...")

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    name = db.Column(db.String(100), nullable=True)  # New field
    age = db.Column(db.Integer, nullable=True)       # New field
    weight = db.Column(db.Float, nullable=True)
    height = db.Column(db.Float, nullable=True)      # New field
    calorie_goal = db.Column(db.Integer, nullable=True)
    preferences = db.Column(db.String(500), nullable=True)  # Favorites and dietary prefs
    plan = db.Column(db.String(50), default="free")

class Meal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    calories = db.Column(db.Integer, nullable=False)
    ingredients = db.Column(db.String(500), nullable=False)
    instructions = db.Column(db.Text, nullable=False)

class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    meal_name = db.Column(db.String(100), nullable=False)