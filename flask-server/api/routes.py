from flask import request, jsonify, Blueprint
from app import User, Calories, db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import re

api = Blueprint("api", __name__)

def is_valid_username(username):
    # Define the regular expression pattern for a valid username
    # The pattern requires the username to be at least 4 characters long
    # The username should not start with an underscore, number, or special character
    # The username cannot contain blank spaces
    # The username can contain letters, digits, underscores, and hyphens after the first character
    pattern = r'^[a-zA-Z][a-zA-Z0-9_-]{3,}$'
    
    # Match the username against the pattern
    if re.match(pattern, username):
        # If the username matches the pattern, it is valid
        return True
    else:
        # If the username does not match the pattern, it is invalid
        return False
    
def is_valid_password(password):
    # Check if the password is at least 8 characters long
    if len(password) < 8:
        return False
    
    # Check if the password contains at least one digit
    if not re.search(r'\d', password):
        return False
    
    # Check if the password contains at least one letter
    if not re.search(r'[a-zA-Z]', password):
        return False
    
    # Check if the password contains any blank spaces
    if ' ' in password:
        return False
    
    # If all criteria are met, return True
    return True

@api.route("/token", methods=["POST"])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(username=username).first()
    if user:
        if username != user.username or password != user.password:
            return jsonify({"msg": "Bad username or password"}), 401
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200
    return jsonify({"msg": "Invalid credentials"}), 403

@api.route("/register", methods=['POST'])
def register():
    form_username = request.json.get("username", None)
    form_password = request.json.get("password", None)

    user = User.query.filter_by(username=form_username).first()
    if user:
        return jsonify({"msg": "Username already exists"}), 409
    
    else:
        if not is_valid_username(form_username) or not is_valid_password(form_password):
            return jsonify({"msg": "Username already exists"}), 400


        new_user = User(username=form_username, password=form_password)

        db.session.add(new_user)
        db.session.commit()

        new_user_id = new_user.id

        new_calories_entry = Calories(
        user_id=new_user_id,
        calories_breakfast=0,
        calories_lunch=0,
        calories_dinner=0,
        calories_snack=0,
        calories_goal=0
        )

        db.session.add(new_calories_entry)
        db.session.commit()

        return jsonify({"msg": "Successfully registered"}), 201

@api.route("/logs")
@jwt_required()
def logs():
    current_user = get_jwt_identity() # get client id from token
    calories_query = Calories.query.filter_by(user_id=current_user).first() # query database to get the clients calories
    
    return jsonify({'calories_breakfast': calories_query.calories_breakfast, 'calories_lunch': calories_query.calories_lunch, 'calories_dinner': calories_query.calories_dinner, 'calories_snack': calories_query.calories_snack, 'calories_goal': calories_query.calories_goal }) # return calories to frontend

@api.route('/update-calories', methods=['POST'])
@jwt_required()
def update_calories():
    current_user = get_jwt_identity() # get client id from token
    calories_query = Calories.query.filter_by(user_id=current_user).first() # query database to get the clients calories

    data = request.json
    if 'caloriesBreakfast' in data and data['caloriesBreakfast']:
        calories_query.calories_breakfast = int(data.get('caloriesBreakfast'))
    if 'caloriesLunch' in data and data['caloriesLunch']:
        calories_query.calories_lunch = int(data['caloriesLunch'])
    if 'caloriesDinner' in data and data['caloriesDinner']:
        calories_query.calories_dinner = int(data['caloriesDinner'])
    if 'caloriesSnack' in data and data['caloriesSnack']:
        calories_query.calories_snack = int(data['caloriesSnack'])
    if 'caloriesGoal' in data and data['caloriesGoal']:
        calories_query.calories_goal = int(data['caloriesGoal'])

    db.session.commit()    

    return jsonify({"message": "Calories updated successfully"})