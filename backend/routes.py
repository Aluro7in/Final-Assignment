from flask import request, jsonify
from models import db, User, Meal
from ai_utils import analyze_food_image, suggest_meal, answer_question

def init_routes(app):
    @app.route('/')
    def home():
        return jsonify({"message": "MealMind Backend Running"})

    @app.route('/signin', methods=['POST'])
    def signin():
        data = request.json
        user = User.query.filter_by(email=data['email'], password=data['password']).first()
        if user:
            return jsonify({"message": "Signed in", "user_id": user.id})
        return jsonify({"error": "Invalid credentials"}), 401

    @app.route('/signup', methods=['POST'])
    def signup():
        data = request.json
        if User.query.filter_by(email=data['email']).first():
            return jsonify({"error": "Email exists"}), 400
        user = User(email=data['email'], password=data['password'], name=data.get('name', ''), age=data.get('age', 0), weight=data.get('weight', 0), height=data.get('height', 0))
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "Signed up", "user_id": user.id})

    @app.route('/profile/<int:user_id>', methods=['GET', 'POST'])
    def update_profile(user_id):
        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        if request.method == 'POST':
            data = request.json
            user.name = data.get('name', user.name)
            user.age = data.get('age', user.age)
            user.weight = data.get('weight', user.weight)
            user.height = data.get('height', user.height)
            user.calorie_goal = data.get('calorie_goal', user.calorie_goal)
            user.preferences = data.get('preferences', user.preferences)
            db.session.commit()
            return jsonify({"message": "Profile updated"})
        return jsonify({
            "email": user.email,
            "name": user.name,
            "age": user.age,
            "weight": user.weight,
            "height": user.height,
            "calorie_goal": user.calorie_goal,
            "preferences": user.preferences
        })

    @app.route('/favorites/<int:user_id>', methods=['GET', 'POST'])
    def favorites(user_id):
        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        if request.method == 'POST':
            data = request.json
            favorite = data.get('name')
            if favorite:
                user.preferences = f"{user.preferences or ''}, {favorite}" if user.preferences else favorite
                db.session.commit()
                return jsonify({"message": "Favorite added"})
            return jsonify({"error": "No favorite name provided"}), 400
        favorites_list = [f.strip() for f in (user.preferences or '').split(',') if f.strip()]
        return jsonify(favorites_list)

    @app.route('/meal/suggest/<int:user_id>', methods=['GET'])
    def suggest_meal_route(user_id):
        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        meal_text = suggest_meal(user.preferences, user.calorie_goal or 2000)
        meal_data = {
            "name": meal_text.split('\n')[1].split(': ')[1],
            "calories": int(meal_text.split('\n')[2].split(': ')[1]),
            "ingredients": meal_text.split('\n')[3].split(': ')[1],
            "instructions": meal_text.split('\n')[4].split(': ')[1]
        }
        return jsonify(meal_data)

    @app.route('/meal/image', methods=['POST'])
    def upload_food_image():

          
        if 'image' not in request.files:
            return jsonify({"error": "No image"}), 400
        image = request.files['image']
        image.save('temp.jpg')
        calories, food_name = analyze_food_image('temp.jpg')
        return jsonify({"food": food_name, "calories": calories})

    @app.route('/search/recipes', methods=['GET'])
    def search_recipes():
        query = request.args.get('q', '')
        return jsonify([{"name": f"{query} Dish", "calories": 500, "ingredients": "Sample ingredients", "nutrition": {"protein": 20, "carbs": 30, "fat": 10}}])

    @app.route('/ask', methods=['POST'])
    def ask_question():
        question = request.json.get('question', '')
        answer = answer_question(question)
        return jsonify({"answer": answer})

    @app.route('/payment/<int:user_id>', methods=['POST'])
    def subscribe(user_id):
        data = request.json
        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        user.plan = data.get('plan')
        db.session.commit()
        return jsonify({"message": f"Subscribed to {user.plan} plan"})

    @app.route('/nutrition/<int:user_id>', methods=['GET'])
    def get_nutrition(user_id):
        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        # Mocked nutrition data based on user preferences and calorie goal
        meal = suggest_meal(user.preferences, user.calorie_goal or 2000)
        meal_data = {
            "name": meal.split('\n')[1].split(': ')[1],
            "calories": int(meal.split('\n')[2].split(': ')[1]),
            "nutrition": {
                "protein": (int(meal.split('\n')[2].split(': ')[1]) * 0.3 / 4).toFixed(1),  # 30% protein
                "carbs": (int(meal.split('\n')[2].split(': ')[1]) * 0.5 / 4).toFixed(1),    # 50% carbs
                "fat": (int(meal.split('\n')[2].split(': ')[1]) * 0.2 / 9).toFixed(1)        # 20% fat
            }
        }
        return jsonify({
            "totalCalories": user.calorie_goal or 2000,
            "meal": meal_data
        })
print("All Loaded*....")