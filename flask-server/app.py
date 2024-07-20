from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import psycopg2

app = Flask(__name__)

app.config['SECRET_KEY'] = ""
app.config["SQLALCHEMY_DATABASE_URI"] = ''
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = ""

db = SQLAlchemy(app)
conn = psycopg2.connect('')

CORS(app)
jwt = JWTManager(app)

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    
    calories = db.relationship('Calories', backref='user', lazy=True)

class Calories(db.Model):
    __tablename__ = 'calories'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    calories_breakfast = db.Column(db.Integer, nullable=False)
    calories_lunch = db.Column(db.Integer, nullable=False)
    calories_dinner = db.Column(db.Integer, nullable=False)
    calories_snack = db.Column(db.Integer, nullable=False)
    calories_goal = db.Column(db.Integer, nullable=False)