import datetime
import webbrowser
import pyjokes
import pyttsx3
import wikipedia
import random

name = input("please enter your first name: ")
age = float(input("how old are you? "))

# about age:

if age < "10":
    quit("you are under 10 years old")

# STARTING THE PROGRAMME

gg = True
engine = pyttsx3.init()
while gg:
    engine.say("hello sir "+name+" I am your python robot")
    engine.say("how can i help you ? ")
    engine.runAndWait()

    order = input("...").lower()

# wikipedia

    if "search on wikipedia about" in order:
        person = order.replace("search on wikipedia about", "")
        info = wikipedia.summary(person, 1)
        print(info)
        engine.say(info)
        engine.runAndWait()

# time

    if "what time is it" in order:
        time = datetime.datetime.now().strftime("%H:%M:%S")
        print(time)
        engine.say("current time is "+time)
        engine.runAndWait()

# jokes

    elif "tell me a joke" in order:
        engine.say(pyjokes.get_joke())
        engine.runAndWait()

# guessing game

    elif "play a game" in order:
        play = engine.say("do you really want to play the guessing game ")
        print("do you really want to play the guessing game ")
        engine.runAndWait()
        guessing_game = input("yes/no: ").lower()

        if guessing_game != "yes":
            quit("ok . I will quit the game")
        else:
            game1 = random.randint(0, 9)
            give = input("guess the number: ")
            if give == game1:
                engine.say("correct")
                engine.say("the guessing game is over sorry sir ")
                engine.runAndWait()
            else:
                engine.say("you're wrong the number was : ")
                print(game1)
                engine.runAndWait()
                engine.say("the guessing game is over ")
                engine.runAndWait()

    if "open" in order:
        engine.say("what's the name of the website ")
        engine.runAndWait()
        print("u can type just the name of it like youtube or google ...")
        web = input("...")
        webbrowser.open("www."+web+".com")

    if "quit" in order:
        quit()

    if "stop" in order:
        gg = False
