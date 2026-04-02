print("AI_utils loaded...")
def analyze_food_image(image_path):
    print("analyze_food_image called")
# ... rest of functionsdef analyze_food_image(image_path):
    return 300, "pizza"  # Mocked response

def suggest_meal(preferences, calorie_goal):
    return f"""
    Meal: Grilled Veggie Salad
    Calories: {calorie_goal // 2}
    Ingredients: Lettuce, tomato, cucumber, olive oil
    Instructions: Chop veggies, mix with olive oil, serve fresh.
    """

def answer_question(question):
    return f"Answer to '{question}': Looks great! Try adding more protein."