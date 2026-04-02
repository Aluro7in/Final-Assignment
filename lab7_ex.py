from OpenGL.GL import *
from OpenGL.GLUT import *
from OpenGL.GLU import *
import numpy as np
import math
WINDOW_SIZE = 60
x0, x1 = -int(WINDOW_SIZE/2),int(WINDOW_SIZE/2)
original_vertices = []
transformed_vertices = []

# ---------------- INPUT ----------------
def get_input():
    global original_vertices, transformed_vertices

    n = int(input("Enter number of polygon points: "))

    print("Enter coordinates (x y):")
    for i in range(n):
        x, y = map(float, input(f"Point {i+1}: ").split())
        original_vertices.append([x, y, 1])  # homogeneous

    print("\nEnter Transformation Values:")
    tx = float(input("Translation tx: "))
    ty = float(input("Translation ty: "))

    sx = float(input("Scaling sx: "))
    sy = float(input("Scaling sy: "))

    angle = float(input("Rotation angle (degrees): "))
    rad = math.radians(angle)

    # -------- MATRICES --------
   #write code here
    print("\nCombined Transformation Matrix:\n", M)

    # Apply transformation
    for v in original_vertices:
        new_v = M @ np.array(v)
        transformed_vertices.append(new_v)
  

# ---------------- DRAW ----------------
def draw_polygon(vertices, r, g, b):
    glColor3f(r, g, b)
    glBegin(GL_POLYGON)
    for v in vertices:
        glVertex2f(v[0], v[1])
    glEnd()


def display():
    glClear(GL_COLOR_BUFFER_BIT)

    # Original - Green
    draw_polygon(original_vertices, 0, 1, 0)

    # Transformed - Red
    draw_polygon(transformed_vertices, 1, 0, 0)

    glFlush()




def main():
    get_input()

    glutInit()
    glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB)
    glutInitWindowSize(WINDOW_SIZE, WINDOW_SIZE)
    glutCreateWindow(b"2D Transformation Lab")
    glMatrixMode(GL_PROJECTION)
    glLoadIdentity()
    gluOrtho2D(x0, x1,x0, x1)  # origin (0,0) at center
    glMatrixMode(GL_MODELVIEW)
    glLoadIdentity()
    glClearColor(1.0, 1.0, 1.0, 1.0)
    glutDisplayFunc(display)
    glutMainLoop()


main()
