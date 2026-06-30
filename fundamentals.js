/* =========================================================
   AlgoPath — Python Fundamentals
   A clickable reference of Python concepts. Each concept opens
   a detail "page" with explanation, usage, common mistakes,
   and runnable terminal-style examples.
   ========================================================= */
(function () {
  "use strict";

  /* ---------------- Concept data ---------------- */
  const CONCEPTS = [
    {
      id: "print", name: "print()", tag: "Built-in Function", stands: "print to screen",
      blurb: "Displays text or values in the output/terminal.",
      what: "print() shows (outputs) whatever you pass to it on the screen. It's usually the very first function every Python beginner learns.",
      why: "Programs need a way to communicate results to the user. print() is Python's simplest way to show output.",
      how: "Put what you want to show inside the parentheses. You can pass text, numbers, variables, or several values separated by commas.",
      when: "Use it to display results, debug your code by checking values, or give feedback to the user.",
      mistakes: [
        "Forgetting the parentheses — in Python 3 you must write print(\"hi\"), not print \"hi\".",
        "Forgetting quotes around text, which makes Python think it's a variable name."
      ],
      examples: [
        { label: "Beginner example", code: "print(\"Hello, World!\")\nprint(\"I am learning Python\")", output: "Hello, World!\nI am learning Python" },
        { label: "Printing several values", code: "name = \"Omar\"\nage = 20\nprint(\"Name:\", name, \"Age:\", age)", output: "Name: Omar Age: 20" }
      ]
    },
    {
      id: "len", name: "len()", tag: "Built-in Function", stands: "length",
      blurb: "Returns how many items are in an object.",
      what: "len() returns the number of items inside an object — characters in a string, or elements in a list, tuple, dictionary, or set.",
      why: "You very often need to know 'how many' — how long a password is, how many users are in a list, etc. len() answers that instantly.",
      how: "Pass one object to len() and it returns an integer count.",
      when: "Use it to validate input length, loop a specific number of times, or check if something is empty (len(x) == 0).",
      mistakes: [
        "Trying len() on a number, e.g. len(5) — numbers have no length and this raises a TypeError.",
        "Confusing the count (number of items) with the highest index (which is len - 1)."
      ],
      examples: [
        { label: "Beginner example", code: "name = \"Python\"\nprint(len(name))", output: "6" },
        { label: "Practical example", code: "students = [\"Sara\", \"Ali\", \"Lina\"]\nprint(\"We have\", len(students), \"students\")", output: "We have 3 students" }
      ]
    },
    {
      id: "input", name: "input()", tag: "Built-in Function", stands: "input from the user",
      blurb: "Reads a line of text typed by the user.",
      what: "input() pauses the program, waits for the user to type something and press Enter, then returns what they typed as a string.",
      why: "Interactive programs need to receive data from the user — names, numbers, choices. input() is how Python asks.",
      how: "Optionally pass a prompt message. Whatever the user types comes back as a string, so convert it with int()/float() if you need a number.",
      when: "Use it for simple console programs, quizzes, calculators, or menus.",
      mistakes: [
        "Forgetting that input() always returns a string — '5' + '5' gives '55', not 10.",
        "Doing math on input directly without converting it first with int() or float()."
      ],
      examples: [
        { label: "Beginner example", code: "name = input(\"What is your name? \")\nprint(\"Hello,\", name)", output: "What is your name? Omar\nHello, Omar" },
        { label: "Reading a number", code: "age = int(input(\"Your age: \"))\nprint(\"Next year you will be\", age + 1)", output: "Your age: 20\nNext year you will be 21" }
      ]
    },
    {
      id: "int", name: "int()", tag: "Built-in Function", stands: "integer",
      blurb: "Converts a value into a whole number.",
      what: "int() turns a value (like a string or a decimal) into an integer — a whole number with no fractional part.",
      why: "Data often arrives as text (especially from input()). To do math you need real numbers, and int() makes whole numbers.",
      how: "Pass a value to int(). For decimals it cuts off (truncates) the fractional part — it does not round.",
      when: "Use it to convert user input into numbers, or to drop the decimals from a float.",
      mistakes: [
        "Trying int(\"hello\") or int(\"3.5\") — these raise a ValueError because they aren't whole numbers.",
        "Expecting int(3.9) to round to 4 — it actually gives 3 (it truncates)."
      ],
      examples: [
        { label: "Beginner example", code: "text = \"42\"\nnumber = int(text)\nprint(number + 8)", output: "50" },
        { label: "Truncating a decimal", code: "price = 19.99\nprint(int(price))", output: "19" }
      ]
    },
    {
      id: "str", name: "str()", tag: "Built-in Function", stands: "string",
      blurb: "Converts a value into text (a string).",
      what: "str() turns any value — a number, a boolean, a list — into its text form so it can be combined with other text.",
      why: "You can't join a number and text with + directly. str() lets you build messages out of mixed data.",
      how: "Pass any value to str() and it returns the string version of it.",
      when: "Use it when building output messages, or saving values as text.",
      mistakes: [
        "Writing \"Age: \" + 20 directly — that raises a TypeError. Use \"Age: \" + str(20).",
        "Forgetting that str(True) becomes the text \"True\", not a boolean."
      ],
      examples: [
        { label: "Beginner example", code: "age = 20\nmessage = \"I am \" + str(age) + \" years old\"\nprint(message)", output: "I am 20 years old" },
        { label: "Numbers as text", code: "score = 95\nprint(\"Score: \" + str(score) + \"%\")", output: "Score: 95%" }
      ]
    },
    {
      id: "float", name: "float()", tag: "Built-in Function", stands: "floating-point number",
      blurb: "Converts a value into a decimal number.",
      what: "float() turns a value into a floating-point number — a number that can have a decimal part, like 3.14 or 19.99.",
      why: "Many real-world values aren't whole — prices, weights, averages. float() represents them.",
      how: "Pass a value (often a string from input) to float() to get a decimal number you can do math with.",
      when: "Use it for money, measurements, percentages, or any calculation needing fractions.",
      mistakes: [
        "Forgetting tiny rounding quirks: 0.1 + 0.2 prints 0.30000000000000004 due to how computers store decimals.",
        "Calling float() on text that isn't a number, e.g. float(\"abc\"), which raises a ValueError."
      ],
      examples: [
        { label: "Beginner example", code: "price = float(\"19.99\")\nprint(price * 2)", output: "39.98" },
        { label: "Average of numbers", code: "total = 7 + 8 + 9\nprint(float(total) / 3)", output: "8.0" }
      ]
    },
    {
      id: "type", name: "type()", tag: "Built-in Function", stands: "type of a value",
      blurb: "Tells you what kind of value something is.",
      what: "type() returns the data type of a value — for example int, str, float, list, or bool.",
      why: "Bugs often come from values being the wrong type. type() lets you check what you're actually working with.",
      how: "Pass any value to type() and it returns its class, which you can print.",
      when: "Use it while learning or debugging to understand or verify the kind of data you have.",
      mistakes: [
        "Relying on type() checks everywhere instead of converting values properly.",
        "Confusing type() (which shows the type) with int()/str() (which change the type)."
      ],
      examples: [
        { label: "Beginner example", code: "print(type(10))\nprint(type(\"hi\"))\nprint(type(3.5))", output: "<class 'int'>\n<class 'str'>\n<class 'float'>" }
      ]
    },
    {
      id: "range", name: "range()", tag: "Built-in Function", stands: "a range of numbers",
      blurb: "Generates a sequence of numbers, often for loops.",
      what: "range() produces a sequence of numbers. range(5) gives 0,1,2,3,4. You can also set a start, stop, and step.",
      why: "Loops frequently need to repeat a set number of times or count through numbers. range() supplies those numbers efficiently.",
      how: "range(stop), range(start, stop), or range(start, stop, step). The stop value is never included.",
      when: "Use it with for loops to repeat actions a fixed number of times or to walk through indexes.",
      mistakes: [
        "Expecting range(1, 5) to include 5 — it stops at 4 (the stop value is excluded).",
        "Trying to print(range(3)) and expecting a list — you'll see range(0, 3); wrap it in list() to see the numbers."
      ],
      examples: [
        { label: "Beginner example", code: "for i in range(5):\n    print(i)", output: "0\n1\n2\n3\n4" },
        { label: "Custom start and step", code: "for n in range(2, 11, 2):\n    print(n)", output: "2\n4\n6\n8\n10" }
      ]
    },
    {
      id: "variables", name: "Variables", tag: "Basics", stands: "named storage boxes",
      blurb: "Names that hold values you can reuse and change.",
      what: "A variable is a name that stores a value. Think of it as a labelled box holding data you can use later.",
      why: "Programs need to remember values — names, scores, totals. Variables give those values a name so you can reuse them.",
      how: "Create one with name = value. Then use the name anywhere you need the value, and reassign it any time.",
      when: "Use variables whenever a value is used more than once or might change as the program runs.",
      mistakes: [
        "Using a variable before assigning it, which raises a NameError.",
        "Choosing unclear names like x or a instead of descriptive ones like total_price."
      ],
      examples: [
        { label: "Beginner example", code: "score = 10\nscore = score + 5\nprint(score)", output: "15" },
        { label: "Multiple variables", code: "first = \"Ada\"\nlast = \"Lovelace\"\nprint(first, last)", output: "Ada Lovelace" }
      ]
    },
    {
      id: "strings", name: "Strings (str)", tag: "Data Type", stands: "text",
      blurb: "Text values written inside quotes.",
      what: "A string is text — letters, numbers, symbols — written inside single or double quotes, like \"hello\" or 'Python'.",
      why: "Most programs deal with words: names, messages, files, and user input. Strings represent all of that text.",
      how: "Wrap text in quotes. Join strings with +, repeat with *, and access characters by index with [].",
      when: "Use strings for any text data — labels, messages, names, or formatting output.",
      mistakes: [
        "Mixing quote styles, e.g. starting with \" and ending with ' — quotes must match.",
        "Trying to change a single character in place — strings are immutable, so build a new one instead."
      ],
      examples: [
        { label: "Beginner example", code: "greeting = \"Hello\"\nname = \"Sara\"\nprint(greeting + \", \" + name + \"!\")", output: "Hello, Sara!" },
        { label: "Indexing & methods", code: "word = \"Python\"\nprint(word[0])\nprint(word.upper())", output: "P\nPYTHON" }
      ]
    },
    {
      id: "numbers", name: "Numbers (int & float)", tag: "Data Type", stands: "integers & decimals",
      blurb: "Whole numbers and decimal numbers for math.",
      what: "Python has int (whole numbers like 7) and float (decimals like 3.14). You do math on both with the usual operators.",
      why: "Almost every program calculates something — totals, averages, prices. Numbers make that possible.",
      how: "Write numbers directly (with or without a decimal point) and combine them with + - * / ** % //.",
      when: "Use int for counting and whole quantities, float for measurements, money, and averages.",
      mistakes: [
        "Expecting / to give a whole number — in Python 3, 7 / 2 is 3.5. Use // for integer division.",
        "Mixing up % (remainder) with / (division)."
      ],
      examples: [
        { label: "Beginner example", code: "print(7 + 3)\nprint(7 / 2)\nprint(7 // 2)\nprint(7 % 2)", output: "10\n3.5\n3\n1" },
        { label: "Powers", code: "print(2 ** 10)", output: "1024" }
      ]
    },
    {
      id: "booleans", name: "Booleans (bool)", tag: "Data Type", stands: "True / False",
      blurb: "Values that are either True or False.",
      what: "A boolean is one of two values: True or False. Comparisons and conditions produce booleans.",
      why: "Decisions in code come down to yes/no questions. Booleans represent those answers.",
      how: "Get a boolean from a comparison (5 > 3 is True) and use it in if statements and while loops.",
      when: "Use booleans to control flow — deciding whether code should run.",
      mistakes: [
        "Writing True and False in lowercase (true / false), which Python doesn't recognise.",
        "Using a single = (assignment) instead of == (comparison) inside a condition."
      ],
      examples: [
        { label: "Beginner example", code: "print(5 > 3)\nprint(10 == 2)\nprint(\"a\" in \"cat\")", output: "True\nFalse\nTrue" }
      ]
    },
    {
      id: "none", name: "None", tag: "Data Type", stands: "no value / nothing",
      blurb: "A special value meaning 'empty' or 'nothing yet'.",
      what: "None is Python's way of saying 'no value'. It's its own type and is often used as a placeholder.",
      why: "Sometimes a variable exists but has no meaningful value yet. None expresses that clearly.",
      how: "Assign None to a variable, and check for it with 'is None' rather than ==.",
      when: "Use it as a default value, or to show a function returns nothing.",
      mistakes: [
        "Confusing None with 0 or an empty string \"\" — they are different things.",
        "Comparing with == None instead of the recommended is None."
      ],
      examples: [
        { label: "Beginner example", code: "result = None\nif result is None:\n    print(\"No result yet\")", output: "No result yet" }
      ]
    },
    {
      id: "if", name: "if / elif / else", tag: "Control Flow", stands: "make decisions",
      blurb: "Run different code depending on a condition.",
      what: "if runs code only when a condition is True. elif (else-if) checks another condition, and else runs when none matched.",
      why: "Programs constantly need to make choices — different actions for different situations. if/elif/else is how.",
      how: "Write if condition:, indent the code below it, and optionally add elif and else blocks. The first True branch runs.",
      when: "Use it any time the program should behave differently based on data — validation, menus, grading.",
      mistakes: [
        "Forgetting the colon : at the end of the if/elif/else line.",
        "Not indenting the body, or mixing tabs and spaces, which causes an IndentationError."
      ],
      examples: [
        { label: "Beginner example", code: "age = 18\nif age >= 18:\n    print(\"Adult\")\nelse:\n    print(\"Minor\")", output: "Adult" },
        { label: "Grading example", code: "score = 75\nif score >= 90:\n    print(\"A\")\nelif score >= 70:\n    print(\"B\")\nelse:\n    print(\"C\")", output: "B" }
      ]
    },
    {
      id: "for", name: "for loop", tag: "Control Flow", stands: "repeat for each item",
      blurb: "Repeats code once for every item in a sequence.",
      what: "A for loop goes through each item in a sequence (a list, string, range, etc.) and runs the same block for each one.",
      why: "Doing the same thing to many items by hand is tedious and error-prone. A for loop automates the repetition.",
      how: "Write for item in sequence:, then indent the code to run for each item. The variable holds the current item.",
      when: "Use it when you know what you're looping over — a list of names, numbers from range(), characters in a string.",
      mistakes: [
        "Forgetting the colon : at the end of the for line.",
        "Changing the list you're looping over while looping, which can skip items."
      ],
      examples: [
        { label: "Beginner example", code: "for fruit in [\"apple\", \"banana\", \"cherry\"]:\n    print(fruit)", output: "apple\nbanana\ncherry" },
        { label: "Counting with range()", code: "total = 0\nfor n in range(1, 6):\n    total = total + n\nprint(total)", output: "15" }
      ]
    },
    {
      id: "while", name: "while loop", tag: "Control Flow", stands: "repeat while true",
      blurb: "Repeats code as long as a condition stays True.",
      what: "A while loop keeps running its block over and over for as long as its condition is True, then stops.",
      why: "Sometimes you don't know how many times to repeat — you just repeat until something changes. while handles that.",
      how: "Write while condition:, indent the body, and make sure something inside eventually makes the condition False.",
      when: "Use it for 'keep going until...' situations — menus, retries, waiting for valid input.",
      mistakes: [
        "Creating an infinite loop by never changing the condition (the program freezes).",
        "Forgetting to update the counter or variable that ends the loop."
      ],
      examples: [
        { label: "Beginner example", code: "count = 1\nwhile count <= 3:\n    print(count)\n    count = count + 1", output: "1\n2\n3" },
        { label: "Countdown", code: "n = 3\nwhile n > 0:\n    print(n)\n    n -= 1\nprint(\"Go!\")", output: "3\n2\n1\nGo!" }
      ]
    },
    {
      id: "break", name: "break / continue", tag: "Control Flow", stands: "stop / skip in loops",
      blurb: "Control how a loop behaves mid-way.",
      what: "break stops a loop immediately. continue skips the rest of the current cycle and jumps to the next one.",
      why: "You don't always want a loop to run fully — sometimes you found what you need (break) or want to skip an item (continue).",
      how: "Place break or continue inside a loop, usually inside an if that decides when to use them.",
      when: "Use break to exit early (e.g. found a match); use continue to ignore certain items.",
      mistakes: [
        "Putting code after break in the same block — it never runs.",
        "Confusing the two: break ends the whole loop, continue only skips one round."
      ],
      examples: [
        { label: "break example", code: "for n in range(1, 10):\n    if n == 4:\n        break\n    print(n)", output: "1\n2\n3" },
        { label: "continue example", code: "for n in range(1, 6):\n    if n == 3:\n        continue\n    print(n)", output: "1\n2\n4\n5" }
      ]
    },
    {
      id: "functions", name: "Functions (def)", tag: "Functions", stands: "define reusable code",
      blurb: "Reusable, named blocks of code you can call anytime.",
      what: "A function is a named block of code you write once and run (call) as many times as you like, optionally with inputs.",
      why: "Repeating the same code is wasteful and hard to maintain. Functions let you write it once and reuse it everywhere.",
      how: "Define one with def name(parameters):, indent the body, and call it with name(arguments). Use return to send a result back.",
      when: "Use functions to organise your program into clear, reusable steps and avoid copy-pasting code.",
      mistakes: [
        "Defining a function but forgetting to call it — defining alone runs nothing.",
        "Confusing print() with return — print shows a value, return hands it back to the caller."
      ],
      examples: [
        { label: "Beginner example", code: "def greet(name):\n    print(\"Hello, \" + name)\n\ngreet(\"Omar\")\ngreet(\"Sara\")", output: "Hello, Omar\nHello, Sara" },
        { label: "Returning a value", code: "def add(a, b):\n    return a + b\n\nresult = add(4, 6)\nprint(result)", output: "10" }
      ]
    },
    {
      id: "return", name: "return", tag: "Functions", stands: "give a result back",
      blurb: "Sends a value out of a function to whoever called it.",
      what: "return ends a function and hands a value back to the code that called it, so the result can be stored or used.",
      why: "Functions are most useful when they produce results you can reuse. return is how a function delivers its answer.",
      how: "Write return value inside a function. The function stops there and the value replaces the function call.",
      when: "Use return whenever a function calculates something the rest of the program needs.",
      mistakes: [
        "Using print() instead of return — you can't store what was only printed.",
        "Writing code after return in the same block — it's unreachable and never runs."
      ],
      examples: [
        { label: "Beginner example", code: "def square(n):\n    return n * n\n\nprint(square(5))\nprint(square(5) + 1)", output: "25\n26" }
      ]
    },
    {
      id: "lists", name: "Lists", tag: "Data Structure", stands: "ordered, changeable collection",
      blurb: "An ordered collection of items you can change.",
      what: "A list stores many items in order, inside square brackets [ ]. You can add, remove, and change items.",
      why: "Programs often handle groups of things — names, scores, tasks. A list keeps them together in one variable.",
      how: "Create with [a, b, c]. Access by index ([0] is first), add with .append(), and loop over it with for.",
      when: "Use a list whenever you have an ordered group of items that may grow, shrink, or change.",
      mistakes: [
        "Forgetting indexes start at 0, so the first item is list[0], not list[1].",
        "Going past the end with an index that's too big, which raises an IndexError."
      ],
      examples: [
        { label: "Beginner example", code: "fruits = [\"apple\", \"banana\"]\nfruits.append(\"cherry\")\nprint(fruits)\nprint(fruits[0])", output: "['apple', 'banana', 'cherry']\napple" },
        { label: "Looping a list", code: "scores = [10, 20, 30]\nfor s in scores:\n    print(s)", output: "10\n20\n30" }
      ]
    },
    {
      id: "tuples", name: "Tuples", tag: "Data Structure", stands: "ordered, fixed collection",
      blurb: "An ordered collection that cannot be changed.",
      what: "A tuple is like a list but immutable — once created, its items can't be changed. It's written with parentheses ( ).",
      why: "Some groups of values should never change — like coordinates (x, y) or a date. Tuples protect that data.",
      how: "Create with (a, b, c). Access items by index just like a list, but you can't add or modify them.",
      when: "Use a tuple for fixed groups of related values that belong together and shouldn't change.",
      mistakes: [
        "Trying to change a tuple item, which raises a TypeError.",
        "Forgetting the comma for a single-item tuple: (5) is just 5, but (5,) is a tuple."
      ],
      examples: [
        { label: "Beginner example", code: "point = (3, 4)\nprint(point[0])\nprint(point[1])", output: "3\n4" }
      ]
    },
    {
      id: "dicts", name: "Dictionaries", tag: "Data Structure", stands: "key → value pairs",
      blurb: "Stores data as labelled key–value pairs.",
      what: "A dictionary stores pairs of keys and values, written with { }. You look up a value by its key instead of a number.",
      why: "Often data has labels — a person's name, age, email. A dictionary keeps each value under a meaningful key.",
      how: "Create with {\"key\": value}. Access with dict[\"key\"], add or update with dict[\"key\"] = value.",
      when: "Use a dictionary when each value has a name/label, or for fast lookups by key.",
      mistakes: [
        "Looking up a key that doesn't exist, which raises a KeyError (use .get() to avoid it).",
        "Expecting items to be accessed by number like a list — dictionaries use keys, not indexes."
      ],
      examples: [
        { label: "Beginner example", code: "person = {\"name\": \"Omar\", \"age\": 20}\nprint(person[\"name\"])\nperson[\"age\"] = 21\nprint(person)", output: "Omar\n{'name': 'Omar', 'age': 21}" }
      ]
    },
    {
      id: "sets", name: "Sets", tag: "Data Structure", stands: "unique items, no order",
      blurb: "A collection of unique items with no duplicates.",
      what: "A set is an unordered collection that automatically removes duplicates. It's written with { } (but with no key:value pairs).",
      why: "Sometimes you only care about unique values — distinct tags, unique visitors. Sets handle that automatically.",
      how: "Create with {a, b, c} or set([...]). Add with .add(), and use it to remove duplicates from a list.",
      when: "Use a set to store unique values or quickly check membership (x in my_set).",
      mistakes: [
        "Expecting sets to keep order — they don't, so don't rely on item positions.",
        "Trying to index a set like my_set[0] — sets are not ordered and don't support indexing."
      ],
      examples: [
        { label: "Beginner example", code: "nums = [1, 2, 2, 3, 3, 3]\nunique = set(nums)\nprint(unique)", output: "{1, 2, 3}" }
      ]
    },
    {
      id: "fstrings", name: "f-strings", tag: "Syntax", stands: "formatted strings",
      blurb: "Easily insert values inside text.",
      what: "An f-string is a string prefixed with f that lets you drop variables and expressions directly inside { } in the text.",
      why: "Building messages with + and str() is clumsy. f-strings make readable, mixed text-and-value output simple.",
      how: "Put f before the quotes and write {variable} or {expression} inside the string.",
      when: "Use f-strings whenever you build output that mixes text with variables or calculations.",
      mistakes: [
        "Forgetting the f before the quotes — then {name} is shown literally instead of its value.",
        "Mismatching the curly braces { }."
      ],
      examples: [
        { label: "Beginner example", code: "name = \"Sara\"\nage = 19\nprint(f\"{name} is {age} years old\")", output: "Sara is 19 years old" },
        { label: "Expressions inside", code: "a = 6\nb = 4\nprint(f\"{a} + {b} = {a + b}\")", output: "6 + 4 = 10" }
      ]
    },
    {
      id: "comments", name: "Comments (#)", tag: "Syntax", stands: "notes for humans",
      blurb: "Notes in your code that Python ignores.",
      what: "A comment starts with # and is ignored when the program runs. It's a note for people reading the code.",
      why: "Code can be hard to understand later. Comments explain why something is done, helping you and others.",
      how: "Put # before your note. Everything after it on that line is ignored by Python.",
      when: "Use comments to explain tricky logic or leave reminders — but keep them meaningful, not obvious.",
      mistakes: [
        "Over-commenting obvious lines (# add 1 to x next to x = x + 1).",
        "Leaving outdated comments that no longer match the code."
      ],
      examples: [
        { label: "Beginner example", code: "# Calculate the total price\nprice = 10\ntax = 2\nprint(price + tax)  # show the result", output: "12" }
      ]
    },
    {
      id: "imports", name: "import & modules", tag: "Modules", stands: "bring in extra tools",
      blurb: "Load extra functionality from other files/libraries.",
      what: "A module is a file full of ready-made code. import brings its tools into your program so you can use them.",
      why: "You don't have to build everything yourself — Python ships with modules (math, random, datetime) full of useful tools.",
      how: "Write import module at the top, then use module.function(). Or import specific things: from math import sqrt.",
      when: "Use imports to reuse existing code — math operations, random numbers, dates, and thousands of libraries.",
      mistakes: [
        "Importing a module but forgetting the module name when calling, e.g. sqrt(9) instead of math.sqrt(9).",
        "Misspelling the module name, which causes a ModuleNotFoundError."
      ],
      examples: [
        { label: "Beginner example", code: "import math\nprint(math.sqrt(16))\nprint(math.pi)", output: "4.0\n3.141592653589793" },
        { label: "Import one tool", code: "from random import randint\nprint(randint(1, 6))", output: "4" }
      ]
    },
    {
      id: "exceptions", name: "try / except", tag: "Errors", stands: "handle errors safely",
      blurb: "Catch errors so the program doesn't crash.",
      what: "try/except lets you run risky code and catch any error (exception) it raises, handling it gracefully instead of crashing.",
      why: "Things go wrong — bad input, missing files. Without handling, the program stops. try/except keeps it running.",
      how: "Put risky code in a try: block and the recovery code in an except: block that runs only if an error happened.",
      when: "Use it around code that might fail — converting user input, opening files, network calls.",
      mistakes: [
        "Catching every error with a bare except and hiding real bugs — catch specific errors when you can.",
        "Putting too much code in try, making it unclear what actually failed."
      ],
      examples: [
        { label: "Beginner example", code: "try:\n    age = int(\"hello\")\nexcept ValueError:\n    print(\"That wasn't a number!\")", output: "That wasn't a number!" },
        { label: "Safe division", code: "try:\n    print(10 / 0)\nexcept ZeroDivisionError:\n    print(\"Cannot divide by zero\")", output: "Cannot divide by zero" }
      ]
    },
    {
      id: "classes", name: "Classes", tag: "OOP", stands: "blueprints for objects",
      blurb: "Templates that bundle data and behavior together.",
      what: "A class is a blueprint for creating objects — it bundles related data (attributes) and actions (methods) together.",
      why: "As programs grow, grouping related data and functions into objects keeps code organised and reusable.",
      how: "Define with class Name:, add an __init__ method to set up data, and create objects by calling Name(...).",
      when: "Use classes to model real things (a User, a Car, a BankAccount) that have both data and behavior.",
      mistakes: [
        "Forgetting self as the first parameter of methods.",
        "Forgetting to call __init__ correctly or to create the object before using it."
      ],
      examples: [
        { label: "Beginner example", code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        print(self.name + \" says Woof!\")\n\nd = Dog(\"Rex\")\nd.bark()", output: "Rex says Woof!" }
      ]
    },
    {
      id: "comprehension", name: "List comprehension", tag: "Syntax", stands: "build lists in one line",
      blurb: "A compact way to create a list from a loop.",
      what: "A list comprehension builds a new list in a single line by looping and optionally filtering — [expr for item in seq].",
      why: "Creating lists with a full for loop takes several lines. Comprehensions do it concisely and readably.",
      how: "Write [expression for item in sequence], and add 'if condition' to keep only some items.",
      when: "Use it for short, clear transformations of a sequence into a new list.",
      mistakes: [
        "Cramming complex logic into one line, making it hard to read — use a normal loop then.",
        "Forgetting the square brackets, which changes the meaning."
      ],
      examples: [
        { label: "Beginner example", code: "squares = [n * n for n in range(1, 6)]\nprint(squares)", output: "[1, 4, 9, 16, 25]" },
        { label: "With a filter", code: "evens = [n for n in range(1, 11) if n % 2 == 0]\nprint(evens)", output: "[2, 4, 6, 8, 10]" }
      ]
    },
    {
      id: "operators", name: "Operators", tag: "Syntax", stands: "symbols that do work",
      blurb: "Symbols for math, comparison, and logic.",
      what: "Operators are symbols that perform actions: math (+ - * / ** % //), comparison (== != < > <= >=), and logic (and, or, not).",
      why: "Almost every line of useful code compares, calculates, or combines values. Operators are the tools that do it.",
      how: "Place an operator between two values. Comparison and logic operators produce booleans used in conditions.",
      when: "Use math operators to calculate, comparison operators in conditions, and and/or/not to combine conditions.",
      mistakes: [
        "Using = (assign) where == (compare) is meant inside an if.",
        "Mixing up // (whole-number division) with / (decimal division), or % (remainder)."
      ],
      examples: [
        { label: "Math & comparison", code: "print(10 % 3)\nprint(2 ** 5)\nprint(7 > 4)", output: "1\n32\nTrue" },
        { label: "Logic operators", code: "age = 20\nprint(age > 12 and age < 65)", output: "True" }
      ]
    },

    {
      id: "arith_op", name: "Arithmetic Operators", tag: "Operators", stands: "math symbols",
      blurb: "Do math: + - * / // % **.",
      what: "Arithmetic operators perform calculations: + add, - subtract, * multiply, / divide, // whole-number divide, % remainder, ** power.",
      why: "Almost every program calculates something — these symbols are how Python does math.",
      how: "Put an operator between two numbers, e.g. a + b. Note that / always returns a decimal in Python 3.",
      when: "Use them for totals, averages, prices, counters, and any calculation.",
      mistakes: ["Expecting / to give a whole number — use // instead.", "Confusing % (remainder) with / (division)."],
      examples: [
        { label: "All operators", code: "print(10 + 3)\nprint(10 // 3)\nprint(10 % 3)\nprint(2 ** 4)", output: "13\n3\n1\n16" }
      ]
    },
    {
      id: "compare_op", name: "Comparison Operators", tag: "Operators", stands: "compare values",
      blurb: "Compare two values: == != < > <= >=.",
      what: "Comparison operators compare two values and return a boolean (True or False): == equal, != not equal, < > <= >=.",
      why: "Decisions depend on comparing values — is the score high enough, is the input correct? These give the yes/no answer.",
      how: "Place a comparison operator between two values inside conditions (if/while).",
      when: "Use them in any condition that checks how two values relate.",
      mistakes: ["Using = (assign) instead of == (compare) in a condition.", "Comparing different types unexpectedly, e.g. \"5\" == 5 is False."],
      examples: [
        { label: "Beginner example", code: "print(5 == 5)\nprint(5 != 3)\nprint(7 < 4)", output: "True\nTrue\nFalse" }
      ]
    },
    {
      id: "logical_op", name: "Logical Operators", tag: "Operators", stands: "combine conditions",
      blurb: "and, or, not — combine boolean conditions.",
      what: "Logical operators combine conditions: and (both must be True), or (at least one True), not (flips True/False).",
      why: "Real decisions often depend on several conditions at once. Logical operators join them into one.",
      how: "Use and / or between two conditions, and not before one to reverse it.",
      when: "Use them when a decision depends on more than one condition.",
      mistakes: ["Writing 'and'/'or' as & / | (those are different, bitwise operators).", "Forgetting Python reads not before and before or."],
      examples: [
        { label: "Beginner example", code: "age = 20\nprint(age > 12 and age < 65)\nprint(age < 13 or age > 64)\nprint(not age == 18)", output: "True\nFalse\nTrue" }
      ]
    },
    {
      id: "assign_op", name: "Assignment Operators", tag: "Operators", stands: "assign & update",
      blurb: "= and shortcuts like += -= *= update variables.",
      what: "Assignment operators store values: = assigns, and += -= *= /= update a variable using its current value.",
      why: "Updating a value (like a running total or counter) is extremely common; the shortcuts make it short and clear.",
      how: "x += 1 is short for x = x + 1. The same works for -= *= /= and more.",
      when: "Use them to build totals, counters, and accumulate values in loops.",
      mistakes: ["Using += on an undefined variable (it must exist first).", "Confusing = (assign) with == (compare)."],
      examples: [
        { label: "Beginner example", code: "total = 0\ntotal += 5\ntotal += 3\nprint(total)", output: "8" }
      ]
    },
    {
      id: "membership_op", name: "Membership Operators", tag: "Operators", stands: "is it inside?",
      blurb: "in / not in — check if a value exists in a sequence.",
      what: "Membership operators check whether a value is inside a sequence: in returns True if found, not in returns True if absent.",
      why: "You often need to ask 'does this list/string/dict contain X?'. These answer instantly.",
      how: "Write value in collection. For dictionaries, in checks the keys.",
      when: "Use them to validate choices, check for duplicates, or search quickly.",
      mistakes: ["Assuming in on a dictionary checks values — it checks keys.", "Case sensitivity: 'a' in 'ABC' is False."],
      examples: [
        { label: "Beginner example", code: "fruits = [\"apple\", \"banana\"]\nprint(\"apple\" in fruits)\nprint(\"cherry\" not in fruits)", output: "True\nTrue" }
      ]
    },
    {
      id: "identity_op", name: "Identity Operators", tag: "Operators", stands: "same object?",
      blurb: "is / is not — check if two names are the same object.",
      what: "Identity operators check whether two names point to the exact same object in memory: is / is not.",
      why: "Sometimes you care about identity, not just equality — most commonly when checking for None.",
      how: "Use 'is None' / 'is not None'. Avoid using is to compare numbers or strings — use == for value equality.",
      when: "Use is/is not mainly to test for None.",
      mistakes: ["Using is to compare values (use == instead).", "Writing == None instead of the recommended is None."],
      examples: [
        { label: "Beginner example", code: "x = None\nprint(x is None)\ny = [1, 2]\nz = [1, 2]\nprint(y is z)", output: "True\nFalse" }
      ]
    },
    {
      id: "pass", name: "pass", tag: "Control Flow", stands: "do nothing",
      blurb: "A placeholder that does nothing.",
      what: "pass is a statement that does nothing. It's used where Python requires some code but you have nothing to put yet.",
      why: "Python needs at least one line inside a block. pass lets you leave a block empty without an error.",
      how: "Write pass inside a function, loop, if, or class body that you'll fill in later.",
      when: "Use it as a temporary placeholder while sketching out your program's structure.",
      mistakes: ["Confusing pass (does nothing) with continue (skips to next loop cycle) or break (exits the loop).", "Leaving pass in finished code where real logic was meant to go."],
      examples: [
        { label: "Beginner example", code: "def todo():\n    pass\n\nfor n in range(3):\n    pass\nprint(\"No errors!\")", output: "No errors!" }
      ]
    },

    {
      id: "list_append", name: "append()", tag: "List Methods", stands: "add to the end",
      blurb: "Adds one item to the end of a list.",
      what: "append() adds a single item to the end of a list, growing it by one.",
      why: "Lists often start empty and grow as the program runs — append() is the main way to build them up.",
      how: "Call my_list.append(item). It changes the list in place and returns None.",
      when: "Use it to collect results inside a loop or add new entries over time.",
      mistakes: ["Writing my_list = my_list.append(x) — append returns None, so this erases your list.", "Using append() to add several items — it adds the whole thing as one item; use extend() for many."],
      examples: [
        { label: "Beginner example", code: "tasks = []\ntasks.append(\"study\")\ntasks.append(\"sleep\")\nprint(tasks)", output: "['study', 'sleep']" }
      ]
    },
    {
      id: "list_remove", name: "remove()", tag: "List Methods", stands: "remove a value",
      blurb: "Removes the first matching value from a list.",
      what: "remove() deletes the first item in a list that equals the value you give it.",
      why: "You often need to take a specific value out of a list — a completed task, a removed user.",
      how: "Call my_list.remove(value). It removes by value (not index) and changes the list in place.",
      when: "Use it when you know the value to delete but not its position.",
      mistakes: ["Calling remove() on a value that isn't there raises a ValueError — check with 'in' first.", "Expecting it to remove all matches — it only removes the first one."],
      examples: [
        { label: "Beginner example", code: "colors = [\"red\", \"green\", \"red\"]\ncolors.remove(\"red\")\nprint(colors)", output: "['green', 'red']" }
      ]
    },
    {
      id: "list_insert", name: "insert()", tag: "List Methods", stands: "insert at an index",
      blurb: "Inserts an item at a specific position.",
      what: "insert(index, item) puts an item at the given position, shifting the rest of the list to the right.",
      why: "Sometimes order matters and a new item belongs in the middle or front, not the end.",
      how: "Call my_list.insert(index, item). Index 0 inserts at the very front.",
      when: "Use it to add an item at an exact position rather than the end.",
      mistakes: ["Mixing up the argument order — it's insert(index, item), not insert(item, index).", "An index larger than the list just adds to the end (no error), which can surprise you."],
      examples: [
        { label: "Beginner example", code: "nums = [1, 2, 4]\nnums.insert(2, 3)\nprint(nums)", output: "[1, 2, 3, 4]" }
      ]
    },
    {
      id: "list_pop", name: "pop()", tag: "List Methods", stands: "remove by index",
      blurb: "Removes and returns an item by index.",
      what: "pop() removes an item by its index and returns it. With no index it removes and returns the last item.",
      why: "Unlike remove(), pop() gives you back the value it removed — useful for processing items one by one.",
      how: "Call my_list.pop() for the last item, or my_list.pop(index) for a specific one.",
      when: "Use it to take items off a list while using their value (stacks, queues, processing).",
      mistakes: ["Calling pop() on an empty list raises an IndexError.", "Confusing pop() (by index, returns value) with remove() (by value, returns None)."],
      examples: [
        { label: "Beginner example", code: "stack = [10, 20, 30]\nlast = stack.pop()\nprint(last)\nprint(stack)", output: "30\n[10, 20]" }
      ]
    },
    {
      id: "list_sort", name: "sort()", tag: "List Methods", stands: "sort in place",
      blurb: "Sorts the list in ascending order.",
      what: "sort() rearranges a list in ascending order, in place (it changes the original list).",
      why: "Ordered data is easier to read and search — leaderboards, alphabetical names, smallest-to-largest.",
      how: "Call my_list.sort(). Add reverse=True for descending order. Use sorted(list) if you want a new list instead.",
      when: "Use it when you want the original list itself reordered.",
      mistakes: ["Writing my_list = my_list.sort() — sort returns None, erasing your list. Use sorted() to get a copy.", "Sorting a list of mixed types (numbers and strings) raises a TypeError."],
      examples: [
        { label: "Beginner example", code: "nums = [3, 1, 2]\nnums.sort()\nprint(nums)\nnums.sort(reverse=True)\nprint(nums)", output: "[1, 2, 3]\n[3, 2, 1]" }
      ]
    },
    {
      id: "list_reverse", name: "reverse()", tag: "List Methods", stands: "reverse the order",
      blurb: "Reverses the order of the list.",
      what: "reverse() flips a list so the last item becomes first, in place.",
      why: "Sometimes you need the opposite order — newest first, countdowns, undo history.",
      how: "Call my_list.reverse(). It changes the list and returns None.",
      when: "Use it to flip the order without sorting.",
      mistakes: ["Expecting reverse() to also sort — it only flips the current order.", "Writing my_list = my_list.reverse() (returns None)."],
      examples: [
        { label: "Beginner example", code: "letters = [\"a\", \"b\", \"c\"]\nletters.reverse()\nprint(letters)", output: "['c', 'b', 'a']" }
      ]
    },

    {
      id: "dict_keys", name: "keys()", tag: "Dictionary Methods", stands: "all the keys",
      blurb: "Returns all the keys of a dictionary.",
      what: "keys() gives you a view of all the keys (the labels) in a dictionary.",
      why: "You often need to list or loop over just the labels — usernames, settings, columns.",
      how: "Call my_dict.keys(). Loop over it, or wrap in list() to get a real list.",
      when: "Use it when you care about the labels, not the values.",
      mistakes: ["Expecting a list — it's a view object; wrap in list() if you need indexing.", "Confusing keys() with values()."],
      examples: [
        { label: "Beginner example", code: "person = {\"name\": \"Omar\", \"age\": 20}\nfor k in person.keys():\n    print(k)", output: "name\nage" }
      ]
    },
    {
      id: "dict_values", name: "values()", tag: "Dictionary Methods", stands: "all the values",
      blurb: "Returns all the values of a dictionary.",
      what: "values() gives you a view of all the values stored in a dictionary (without their keys).",
      why: "Sometimes you only need the data itself — to sum scores, find a max, or list contents.",
      how: "Call my_dict.values(). Loop over it or wrap in list().",
      when: "Use it when you care about the stored data, not the labels.",
      mistakes: ["Trying to access values by key from this view — use my_dict[key] for that.", "Forgetting values can repeat (keys can't)."],
      examples: [
        { label: "Beginner example", code: "scores = {\"a\": 10, \"b\": 20}\nprint(sum(scores.values()))", output: "30" }
      ]
    },
    {
      id: "dict_items", name: "items()", tag: "Dictionary Methods", stands: "key–value pairs",
      blurb: "Returns all key–value pairs together.",
      what: "items() gives you each key together with its value as pairs, perfect for looping.",
      why: "Often you want both the label and the data at the same time while looping.",
      how: "Use 'for key, value in my_dict.items():' to unpack each pair.",
      when: "Use it to loop through a dictionary using both keys and values.",
      mistakes: ["Forgetting to unpack into two variables (key, value).", "Expecting a list — it's a view; wrap in list() if needed."],
      examples: [
        { label: "Beginner example", code: "person = {\"name\": \"Omar\", \"age\": 20}\nfor k, v in person.items():\n    print(k, \"=\", v)", output: "name = Omar\nage = 20" }
      ]
    },
    {
      id: "dict_get", name: "get()", tag: "Dictionary Methods", stands: "safe lookup",
      blurb: "Gets a value by key without crashing if missing.",
      what: "get() returns the value for a key, or a default (None, or one you choose) if the key isn't there — instead of an error.",
      why: "Looking up a missing key with [] raises a KeyError. get() avoids the crash.",
      how: "Call my_dict.get(key) or my_dict.get(key, default_value).",
      when: "Use it whenever a key might not exist and you want a safe fallback.",
      mistakes: ["Still using my_dict[key] for keys that might be missing (raises KeyError).", "Forgetting you can supply a custom default as the second argument."],
      examples: [
        { label: "Beginner example", code: "person = {\"name\": \"Omar\"}\nprint(person.get(\"age\"))\nprint(person.get(\"age\", 0))", output: "None\n0" }
      ]
    },
    {
      id: "dict_update", name: "update()", tag: "Dictionary Methods", stands: "merge / update",
      blurb: "Adds or updates entries from another dictionary.",
      what: "update() merges another dictionary (or key–value pairs) into this one, adding new keys and overwriting existing ones.",
      why: "You often need to combine settings or apply changes to a dictionary at once.",
      how: "Call my_dict.update(other_dict). Keys that already exist get their values replaced.",
      when: "Use it to merge dictionaries or apply several changes in one step.",
      mistakes: ["Forgetting that existing keys get overwritten.", "Expecting a new dictionary back — it changes the original in place."],
      examples: [
        { label: "Beginner example", code: "settings = {\"volume\": 5}\nsettings.update({\"volume\": 8, \"theme\": \"dark\"})\nprint(settings)", output: "{'volume': 8, 'theme': 'dark'}" }
      ]
    },

    {
      id: "set_add", name: "add()", tag: "Set Methods", stands: "add to a set",
      blurb: "Adds one item to a set.",
      what: "add() inserts a single item into a set. If the item is already there, nothing changes (sets keep things unique).",
      why: "Sets are how you collect unique values; add() is how you grow them.",
      how: "Call my_set.add(item).",
      when: "Use it to build a collection where duplicates should be ignored.",
      mistakes: ["Confusing add() (sets, one item) with append() (lists).", "Expecting duplicates to be added — they're silently ignored."],
      examples: [
        { label: "Beginner example", code: "tags = {\"python\"}\ntags.add(\"code\")\ntags.add(\"python\")\nprint(tags)", output: "{'python', 'code'}" }
      ]
    },
    {
      id: "set_remove", name: "remove() (set)", tag: "Set Methods", stands: "remove from a set",
      blurb: "Removes an item from a set.",
      what: "remove() deletes a specific item from a set.",
      why: "You sometimes need to take a value out of a set of unique items.",
      how: "Call my_set.remove(item). Use discard() instead if you're not sure the item exists.",
      when: "Use it to delete a known item from a set.",
      mistakes: ["remove() on a missing item raises a KeyError — use discard() to avoid that.", "Forgetting sets are unordered, so there's no 'position' to remove."],
      examples: [
        { label: "Beginner example", code: "nums = {1, 2, 3}\nnums.remove(2)\nprint(nums)", output: "{1, 3}" }
      ]
    },
    {
      id: "set_union", name: "union()", tag: "Set Methods", stands: "combine sets",
      blurb: "Returns all items from both sets.",
      what: "union() returns a new set containing every item from both sets, with duplicates merged.",
      why: "Combining two groups of unique things (all tags, all users) is a common need.",
      how: "Call a.union(b) or use the | operator: a | b.",
      when: "Use it to merge two sets into one without duplicates.",
      mistakes: ["Expecting it to change the original — it returns a new set.", "Confusing union (everything) with intersection (only common items)."],
      examples: [
        { label: "Beginner example", code: "a = {1, 2}\nb = {2, 3}\nprint(a.union(b))", output: "{1, 2, 3}" }
      ]
    },
    {
      id: "set_intersection", name: "intersection()", tag: "Set Methods", stands: "common items",
      blurb: "Returns items present in both sets.",
      what: "intersection() returns a new set of only the items that appear in both sets.",
      why: "Finding what two groups have in common (shared interests, overlapping tags) is very useful.",
      how: "Call a.intersection(b) or use the & operator: a & b.",
      when: "Use it to find shared elements between two sets.",
      mistakes: ["Confusing intersection (common only) with union (everything).", "Expecting the original set to change — it returns a new one."],
      examples: [
        { label: "Beginner example", code: "a = {1, 2, 3}\nb = {2, 3, 4}\nprint(a.intersection(b))", output: "{2, 3}" }
      ]
    },

    {
      id: "parameters", name: "Parameters", tag: "Functions", stands: "inputs in the definition",
      blurb: "The named inputs listed when you define a function.",
      what: "Parameters are the variable names you put in the parentheses when defining a function — placeholders for the values it will receive.",
      why: "Functions become reusable when they can work on different inputs. Parameters are those input slots.",
      how: "List them in def name(param1, param2):. You can give defaults like def greet(name=\"friend\").",
      when: "Use parameters whenever a function should work with values supplied by the caller.",
      mistakes: ["Putting a parameter without a default after one with a default (Python raises an error).", "Confusing parameters (in the definition) with arguments (the real values passed)."],
      examples: [
        { label: "Beginner example", code: "def power(base, exp=2):\n    return base ** exp\n\nprint(power(5))\nprint(power(5, 3))", output: "25\n125" }
      ]
    },
    {
      id: "arguments", name: "Arguments", tag: "Functions", stands: "values you pass in",
      blurb: "The actual values you give a function when calling it.",
      what: "Arguments are the real values you pass into a function when you call it; they fill the function's parameters.",
      why: "Parameters are empty slots; arguments are the concrete data that makes the function actually do work.",
      how: "Pass them by position power(2, 3), or by name power(base=2, exp=3) for clarity.",
      when: "Use named (keyword) arguments when a call would otherwise be hard to read.",
      mistakes: ["Passing arguments in the wrong order when using positions.", "Passing more or fewer arguments than the function expects."],
      examples: [
        { label: "Beginner example", code: "def greet(greeting, name):\n    print(greeting + \", \" + name)\n\ngreet(\"Hi\", \"Sara\")\ngreet(name=\"Ali\", greeting=\"Hello\")", output: "Hi, Sara\nHello, Ali" }
      ]
    },
    {
      id: "scope", name: "Scope (local & global)", tag: "Functions", stands: "where a variable lives",
      blurb: "Where a variable can be seen — inside vs outside a function.",
      what: "Scope is the region where a variable exists. Local variables live only inside their function; global variables live in the whole file.",
      why: "Understanding scope prevents confusing bugs where a variable seems to 'disappear' or not update.",
      how: "Variables made inside a function are local. To change a global from inside a function, declare 'global name' (use sparingly).",
      when: "Keep variables local by default; reach for global only when truly necessary.",
      mistakes: ["Expecting a variable created inside a function to be visible outside it.", "Overusing global variables, which makes code hard to follow."],
      examples: [
        { label: "Beginner example", code: "count = 0\ndef show():\n    count = 5   # local, separate\n    print(count)\nshow()\nprint(count)", output: "5\n0" }
      ]
    },

    {
      id: "max", name: "max()", tag: "Built-in Function", stands: "the maximum",
      blurb: "Returns the largest item.",
      what: "max() returns the biggest value from several arguments or from a list/sequence.",
      why: "Finding the highest value (top score, most expensive item) is a constant need.",
      how: "Call max(a, b, c) or max(my_list).",
      when: "Use it to find the largest number or the 'last' item alphabetically.",
      mistakes: ["Calling max() on an empty list raises a ValueError.", "Mixing incompatible types (numbers and strings) raises a TypeError."],
      examples: [
        { label: "Beginner example", code: "print(max(3, 9, 1))\nscores = [55, 92, 70]\nprint(max(scores))", output: "9\n92" }
      ]
    },
    {
      id: "min", name: "min()", tag: "Built-in Function", stands: "the minimum",
      blurb: "Returns the smallest item.",
      what: "min() returns the smallest value from several arguments or from a sequence.",
      why: "Finding the lowest value (cheapest price, lowest score) is just as common as the highest.",
      how: "Call min(a, b, c) or min(my_list).",
      when: "Use it to find the smallest number or the 'first' item alphabetically.",
      mistakes: ["Calling min() on an empty list raises a ValueError.", "Confusing min() with the smallest index (it returns the value)."],
      examples: [
        { label: "Beginner example", code: "print(min(3, 9, 1))\nprint(min([55, 92, 70]))", output: "1\n55" }
      ]
    },
    {
      id: "sum", name: "sum()", tag: "Built-in Function", stands: "add them all up",
      blurb: "Adds all numbers in a sequence.",
      what: "sum() adds together every number in a list or sequence and returns the total.",
      why: "Totalling values (a bill, all scores) is one of the most common tasks in programming.",
      how: "Call sum(my_list). You can add a starting value: sum(my_list, 100).",
      when: "Use it instead of writing a loop just to add numbers.",
      mistakes: ["Calling sum() on a list of strings raises a TypeError — use ''.join() for text.", "Forgetting it only works on numbers (and number-like values)."],
      examples: [
        { label: "Beginner example", code: "prices = [10, 20, 30]\nprint(sum(prices))", output: "60" }
      ]
    },
    {
      id: "abs", name: "abs()", tag: "Built-in Function", stands: "absolute value",
      blurb: "Returns a number without its sign.",
      what: "abs() returns the absolute value of a number — its distance from zero, always positive.",
      why: "Sometimes the size of a number matters but its sign doesn't — differences, distances.",
      how: "Call abs(number). abs(-7) and abs(7) both give 7.",
      when: "Use it for differences or distances where the result must be positive.",
      mistakes: ["Calling abs() on text instead of a number (TypeError).", "Confusing abs() with round()."],
      examples: [
        { label: "Beginner example", code: "print(abs(-7))\nprint(abs(3 - 10))", output: "7\n7" }
      ]
    },
    {
      id: "round", name: "round()", tag: "Built-in Function", stands: "round a number",
      blurb: "Rounds a number to a chosen number of decimals.",
      what: "round() rounds a number to the nearest whole number, or to a given number of decimal places.",
      why: "Money and measurements usually need a tidy number of decimals, not long trailing digits.",
      how: "Call round(number) or round(number, decimals), e.g. round(3.14159, 2).",
      when: "Use it to display prices, averages, or measurements cleanly.",
      mistakes: ["Expecting round(2.5) to give 3 — Python uses banker's rounding (rounds to 2).", "Confusing round() with int() (which just truncates)."],
      examples: [
        { label: "Beginner example", code: "print(round(3.14159, 2))\nprint(round(7.8))", output: "3.14\n8" }
      ]
    },
    {
      id: "sorted", name: "sorted()", tag: "Built-in Function", stands: "return a sorted copy",
      blurb: "Returns a new sorted list (original unchanged).",
      what: "sorted() returns a brand-new sorted list from any sequence, leaving the original untouched.",
      why: "Unlike list.sort(), sorted() works on any sequence and keeps the original as-is.",
      how: "Call sorted(sequence). Add reverse=True for descending, or key=... for custom sorting.",
      when: "Use it when you want a sorted copy but need to keep the original order too.",
      mistakes: ["Confusing sorted() (returns a new list) with .sort() (changes in place, returns None).", "Sorting mixed types raises a TypeError."],
      examples: [
        { label: "Beginner example", code: "nums = [3, 1, 2]\nprint(sorted(nums))\nprint(nums)", output: "[1, 2, 3]\n[3, 1, 2]" }
      ]
    },
    {
      id: "enumerate", name: "enumerate()", tag: "Built-in Function", stands: "number each item",
      blurb: "Loops giving both index and item.",
      what: "enumerate() lets a loop access both the position (index) and the value of each item at once.",
      why: "Often you need the item AND its number — line numbers, ranking, labelling.",
      how: "Use 'for i, item in enumerate(seq):'. Add start=1 to begin counting at 1.",
      when: "Use it whenever you need the index together with the value while looping.",
      mistakes: ["Manually tracking a counter variable instead of using enumerate.", "Forgetting to unpack into two variables (i, item)."],
      examples: [
        { label: "Beginner example", code: "fruits = [\"apple\", \"banana\"]\nfor i, fruit in enumerate(fruits, start=1):\n    print(i, fruit)", output: "1 apple\n2 banana" }
      ]
    },
    {
      id: "zip", name: "zip()", tag: "Built-in Function", stands: "pair up sequences",
      blurb: "Combines two sequences item by item.",
      what: "zip() pairs up items from two (or more) sequences position by position, so you can loop over them together.",
      why: "Related data is often in separate lists (names and scores). zip() walks them in step.",
      how: "Use 'for a, b in zip(list1, list2):'. It stops at the shorter sequence.",
      when: "Use it to loop over several lists at the same time.",
      mistakes: ["Forgetting it stops at the shortest list (extra items are dropped).", "Trying to print(zip(...)) directly — wrap it in list() to see pairs."],
      examples: [
        { label: "Beginner example", code: "names = [\"Sara\", \"Ali\"]\nscores = [90, 85]\nfor n, s in zip(names, scores):\n    print(n, s)", output: "Sara 90\nAli 85" }
      ]
    },
    {
      id: "map", name: "map()", tag: "Built-in Function", stands: "apply to each item",
      blurb: "Applies a function to every item.",
      what: "map() runs a function on every item of a sequence and gives back the results.",
      why: "Transforming every item the same way (doubling, converting types) is common; map() does it compactly.",
      how: "Call map(function, sequence) and wrap in list() to see the results.",
      when: "Use it to transform a whole sequence — though a list comprehension is often clearer for beginners.",
      mistakes: ["Forgetting to wrap map() in list() — it returns a lazy map object.", "Passing function() with parentheses instead of just the function name."],
      examples: [
        { label: "Beginner example", code: "nums = [1, 2, 3]\ndoubled = list(map(lambda x: x * 2, nums))\nprint(doubled)", output: "[2, 4, 6]" }
      ]
    },
    {
      id: "filter", name: "filter()", tag: "Built-in Function", stands: "keep matching items",
      blurb: "Keeps only items that pass a test.",
      what: "filter() keeps only the items of a sequence for which a function returns True.",
      why: "Selecting a subset (only evens, only valid entries) is a frequent need.",
      how: "Call filter(function, sequence) and wrap in list(). The function should return True/False.",
      when: "Use it to pick out items matching a condition (a comprehension with if is often clearer).",
      mistakes: ["Forgetting to wrap filter() in list().", "Giving a function that doesn't return a boolean."],
      examples: [
        { label: "Beginner example", code: "nums = [1, 2, 3, 4]\nevens = list(filter(lambda x: x % 2 == 0, nums))\nprint(evens)", output: "[2, 4]" }
      ]
    },

    {
      id: "str_index", name: "String Indexing", tag: "String Methods", stands: "get one character",
      blurb: "Access a single character by its position.",
      what: "String indexing gets one character from a string by its position, starting at 0. Negative indexes count from the end.",
      why: "You often need a specific character — the first letter, the last digit.",
      how: "Use text[0] for the first character, text[-1] for the last.",
      when: "Use it to read individual characters from text.",
      mistakes: ["Forgetting indexing starts at 0, so text[1] is the SECOND character.", "Going past the end raises an IndexError."],
      examples: [
        { label: "Beginner example", code: "word = \"Python\"\nprint(word[0])\nprint(word[-1])", output: "P\nn" }
      ]
    },
    {
      id: "str_slice", name: "String Slicing", tag: "String Methods", stands: "get part of a string",
      blurb: "Extract a section of a string.",
      what: "Slicing takes a piece of a string using text[start:stop] — from start up to (but not including) stop.",
      why: "You frequently need part of some text — a prefix, a substring, the first few characters.",
      how: "Use text[start:stop], text[:n] for the first n, or text[n:] for everything after n.",
      when: "Use it to grab substrings without looping character by character.",
      mistakes: ["Forgetting the stop index is excluded (text[0:3] gives 3 characters).", "Mixing up the order of start and stop."],
      examples: [
        { label: "Beginner example", code: "word = \"Python\"\nprint(word[0:3])\nprint(word[3:])", output: "Pyt\nhon" }
      ]
    },
    {
      id: "str_upper", name: "upper() / lower()", tag: "String Methods", stands: "change letter case",
      blurb: "Convert text to UPPERCASE or lowercase.",
      what: "upper() returns the text in all capitals; lower() returns it all in small letters. The original string is unchanged.",
      why: "Case-insensitive comparisons and tidy display both need consistent casing.",
      how: "Call text.upper() or text.lower(). Strings are immutable, so they return a new string.",
      when: "Use them to normalise input before comparing, or to format output.",
      mistakes: ["Forgetting they return a new string — text.upper() alone doesn't change text.", "Expecting them to change the original variable in place."],
      examples: [
        { label: "Beginner example", code: "name = \"Python\"\nprint(name.upper())\nprint(name.lower())", output: "PYTHON\npython" }
      ]
    },
    {
      id: "str_replace", name: "replace()", tag: "String Methods", stands: "swap text",
      blurb: "Replaces parts of a string with something else.",
      what: "replace(old, new) returns a new string with every occurrence of old swapped for new.",
      why: "Cleaning or editing text — fixing typos, removing characters — is very common.",
      how: "Call text.replace(\"old\", \"new\"). It returns a new string and replaces all matches.",
      when: "Use it to substitute or remove parts of text.",
      mistakes: ["Forgetting it returns a new string (assign the result back).", "Expecting it to replace only the first match — it replaces all of them."],
      examples: [
        { label: "Beginner example", code: "text = \"I like cats\"\nprint(text.replace(\"cats\", \"dogs\"))", output: "I like dogs" }
      ]
    },
    {
      id: "str_find", name: "find()", tag: "String Methods", stands: "locate a substring",
      blurb: "Finds the position of text inside a string.",
      what: "find() returns the index where a substring first appears, or -1 if it isn't found.",
      why: "Knowing where text occurs lets you check for it or slice around it.",
      how: "Call text.find(\"sub\"). It returns the starting index, or -1 when missing.",
      when: "Use it to locate text or test whether something exists (often 'in' is simpler for a yes/no).",
      mistakes: ["Forgetting that -1 means 'not found', not a valid position.", "Using find() when you only need a True/False — 'in' is clearer."],
      examples: [
        { label: "Beginner example", code: "text = \"hello world\"\nprint(text.find(\"world\"))\nprint(text.find(\"xyz\"))", output: "6\n-1" }
      ]
    },
    {
      id: "str_split", name: "split()", tag: "String Methods", stands: "break text into a list",
      blurb: "Splits a string into a list of pieces.",
      what: "split() breaks a string into a list, cutting at spaces by default (or any separator you give).",
      why: "Text often needs breaking apart — words in a sentence, values in a CSV line.",
      how: "Call text.split() for spaces, or text.split(\",\") to split on commas.",
      when: "Use it to turn a line of text into separate, processable parts.",
      mistakes: ["Forgetting the default splits on whitespace, not commas.", "Expecting it to change the string — it returns a new list."],
      examples: [
        { label: "Beginner example", code: "sentence = \"learn python today\"\nwords = sentence.split()\nprint(words)\nprint(\"a,b,c\".split(\",\"))", output: "['learn', 'python', 'today']\n['a', 'b', 'c']" }
      ]
    },
    {
      id: "str_strip", name: "strip()", tag: "String Methods", stands: "trim whitespace",
      blurb: "Removes extra spaces from the ends.",
      what: "strip() returns a new string with leading and trailing whitespace (spaces, tabs, newlines) removed.",
      why: "User input and file data often have stray spaces that break comparisons. strip() cleans them.",
      how: "Call text.strip(). Use lstrip()/rstrip() to trim only one side, or pass characters to remove.",
      when: "Use it to clean up input before comparing or storing it.",
      mistakes: ["Expecting it to remove spaces in the MIDDLE — it only trims the ends.", "Forgetting to assign the result back."],
      examples: [
        { label: "Beginner example", code: "raw = \"   hello   \"\nprint(\"[\" + raw.strip() + \"]\")", output: "[hello]" }
      ]
    },

    {
      id: "syntax", name: "Python Syntax", tag: "Basics", stands: "the rules of writing Python",
      blurb: "How Python code must be written to run.",
      what: "Syntax is the set of rules for writing valid Python: indentation defines blocks, lines usually end without semicolons, and a colon starts a block.",
      why: "Computers need predictable structure. Python's clean, indentation-based syntax makes code readable and consistent.",
      how: "Indent code inside if/for/while/def blocks (4 spaces is standard), end block headers with a colon, and keep one statement per line.",
      when: "These rules apply to every line of Python you write.",
      mistakes: ["Mixing tabs and spaces for indentation, which causes an IndentationError.", "Forgetting the colon : at the end of if/for/while/def lines."],
      examples: [
        { label: "Indentation example", code: "if 5 > 3:\n    print(\"Inside the if\")\nprint(\"Outside the if\")", output: "Inside the if\nOutside the if" }
      ]
    },
    {
      id: "naming_rules", name: "Variable Naming Rules", tag: "Basics", stands: "valid names for variables",
      blurb: "What you can and can't name a variable.",
      what: "Variable names may use letters, digits, and underscores, must start with a letter or underscore, can't start with a digit, and can't be Python keywords.",
      why: "Clear, valid names make code readable and prevent errors. Good names describe what the value holds.",
      how: "Use lowercase with underscores (snake_case), like total_price. Names are case-sensitive: age and Age differ.",
      when: "Apply these rules every time you create a variable.",
      mistakes: ["Starting a name with a digit (2age) — not allowed.", "Using reserved words like for or class as names."],
      examples: [
        { label: "Valid names", code: "user_name = \"Omar\"\nage2 = 20\n_total = 100\nprint(user_name, age2, _total)", output: "Omar 20 100" }
      ]
    },
    {
      id: "bool", name: "bool()", tag: "Built-in Function", stands: "boolean / truth value",
      blurb: "Converts a value into True or False.",
      what: "bool() turns any value into True or False. Empty things (0, \"\", [], None) are False; everything else is True.",
      why: "Conditions rely on truthiness. bool() shows how Python judges a value as 'true' or 'false'.",
      how: "Call bool(value). Python also does this automatically inside if and while.",
      when: "Use it to check whether a value counts as 'empty' or to understand truthiness.",
      mistakes: ["Thinking only False/0 are falsy — empty strings, lists, and None are too.", "Writing true/false in lowercase — Python uses True/False."],
      examples: [
        { label: "Truthiness", code: "print(bool(0))\nprint(bool(\"\"))\nprint(bool(\"hi\"))\nprint(bool([1, 2]))", output: "False\nFalse\nTrue\nTrue" }
      ]
    },

    {
      id: "file_open", name: "open()", tag: "File Handling", stands: "open a file",
      blurb: "Opens a file so you can read or write it.",
      what: "open() connects your program to a file. You give it a filename and a mode: 'r' read, 'w' write, 'a' append.",
      why: "Programs need to save and load data that outlives the program — notes, logs, settings.",
      how: "Call open(\"file.txt\", \"w\"). Always close the file afterward, or better, use a with block.",
      when: "Use it whenever you need to read from or write to a file on disk.",
      mistakes: ["Opening with 'w' on an existing file erases its contents.", "Forgetting to close the file, which can lose unsaved data."],
      examples: [
        { label: "Beginner example", code: "f = open(\"notes.txt\", \"w\")\nf.write(\"Hello, file!\")\nf.close()\nprint(\"Saved!\")", output: "Saved!" }
      ]
    },
    {
      id: "file_read", name: "read()", tag: "File Handling", stands: "read file contents",
      blurb: "Reads the text inside a file.",
      what: "read() returns the entire contents of an opened file as a string. (readline() reads one line; readlines() returns a list.)",
      why: "To use saved data — load a config, display a saved note — you must read it back in.",
      how: "Open the file in read mode and call f.read(). A with block closes it for you automatically.",
      when: "Use it to load the full contents of a small text file.",
      mistakes: ["Reading a file that doesn't exist raises a FileNotFoundError.", "Calling read() twice — the second returns \"\" because you're already at the end."],
      examples: [
        { label: "Write then read", code: "with open(\"greeting.txt\", \"w\") as f:\n    f.write(\"Hello, file!\")\n\nwith open(\"greeting.txt\", \"r\") as f:\n    print(f.read())", output: "Hello, file!" }
      ]
    },
    {
      id: "file_write", name: "write()", tag: "File Handling", stands: "write to a file",
      blurb: "Writes text into a file.",
      what: "write() puts text into a file opened in write ('w') or append ('a') mode. Write mode replaces the whole file.",
      why: "Saving results, logs, or user data to disk needs a way to put text into a file.",
      how: "Open in 'w' mode and call f.write(\"text\"). Add \\n yourself for new lines — write() doesn't add them.",
      when: "Use it to create or overwrite a file with new content.",
      mistakes: ["Forgetting that 'w' erases the existing file first — use 'a' to keep old content.", "Expecting write() to add line breaks automatically (it doesn't)."],
      examples: [
        { label: "Beginner example", code: "with open(\"log.txt\", \"w\") as f:\n    f.write(\"Line 1\\n\")\n    f.write(\"Line 2\\n\")\nprint(\"2 lines written\")", output: "2 lines written" }
      ]
    },
    {
      id: "file_append", name: "Append mode ('a')", tag: "File Handling", stands: "add without erasing",
      blurb: "Adds to a file instead of overwriting it.",
      what: "Opening a file in append mode ('a') adds new text to the end without deleting what's already there.",
      why: "Logs and records should grow over time, not be wiped each run. Append mode keeps the history.",
      how: "Open with open(\"file.txt\", \"a\"), then write(). New text goes at the end of the file.",
      when: "Use it for logs, journals, or any file you keep adding to.",
      mistakes: ["Using 'w' by mistake, which erases the previous content.", "Forgetting \\n, so new entries run together on one line."],
      examples: [
        { label: "Beginner example", code: "with open(\"log.txt\", \"a\") as f:\n    f.write(\"New entry\\n\")\nprint(\"Added without erasing\")", output: "Added without erasing" }
      ]
    },
    {
      id: "file_close", name: "close()", tag: "File Handling", stands: "close the file",
      blurb: "Closes a file and saves changes.",
      what: "close() finishes working with a file, flushing any unsaved data and freeing the resource.",
      why: "Open files use system resources and may not save fully until closed. Closing makes data safe.",
      how: "Call f.close() when done. Better: use a with block, which closes the file automatically.",
      when: "Always close a file you opened with open() — unless you used a with block.",
      mistakes: ["Forgetting to close, risking lost data or locked files.", "Using a file after closing it, which raises a ValueError."],
      examples: [
        { label: "Beginner example", code: "f = open(\"data.txt\", \"w\")\nf.write(\"done\")\nf.close()\nprint(\"File closed safely\")", output: "File closed safely" }
      ]
    },
    {
      id: "with_files", name: "with (file context)", tag: "File Handling", stands: "auto-close files",
      blurb: "Opens a file and closes it automatically.",
      what: "A with block opens a file and guarantees it's closed afterward — even if an error happens inside.",
      why: "Forgetting close() is a common bug. with handles closing for you, making file code safer and cleaner.",
      how: "Write 'with open(\"file.txt\") as f:' and work with f inside the indented block.",
      when: "Use with for almost all file work — it's the recommended modern way.",
      mistakes: ["Trying to use the file variable outside the with block (it's already closed).", "Still calling close() manually inside a with (not needed)."],
      examples: [
        { label: "Beginner example", code: "with open(\"poem.txt\", \"w\") as f:\n    f.write(\"Roses are red\")\n\nwith open(\"poem.txt\") as f:\n    print(f.read())", output: "Roses are red" }
      ]
    },

    {
      id: "finally", name: "finally", tag: "Errors", stands: "always runs",
      blurb: "Code that runs no matter what.",
      what: "A finally block runs after try/except whether or not an error happened — perfect for cleanup.",
      why: "Some actions (closing files, releasing resources) must happen regardless of success or failure.",
      how: "Add finally: after your try/except blocks. Its code always runs at the end.",
      when: "Use it for cleanup that must always happen — closing connections or files.",
      mistakes: ["Putting cleanup only in try, so it's skipped when an error occurs.", "Expecting finally to stop the error — it runs, then the error still propagates if not caught."],
      examples: [
        { label: "Beginner example", code: "try:\n    print(10 / 2)\nexcept ZeroDivisionError:\n    print(\"error\")\nfinally:\n    print(\"Always runs\")", output: "5.0\nAlways runs" }
      ]
    },
    {
      id: "raise", name: "raise", tag: "Errors", stands: "trigger an error",
      blurb: "Deliberately raises an exception.",
      what: "raise lets you trigger an error on purpose when something is wrong — like invalid input.",
      why: "Sometimes the best response to bad data is to stop and signal a clear error rather than continue with wrong values.",
      how: "Write raise ErrorType(\"message\"), e.g. raise ValueError(\"Age cannot be negative\").",
      when: "Use it to enforce rules in your functions and report invalid situations clearly.",
      mistakes: ["Raising a plain string (raise \"oops\") — you must raise an exception object.", "Overusing raise where a simple if-message would be friendlier."],
      examples: [
        { label: "Beginner example", code: "def set_age(age):\n    if age < 0:\n        raise ValueError(\"Age cannot be negative\")\n    return age\n\ntry:\n    set_age(-5)\nexcept ValueError as e:\n    print(e)", output: "Age cannot be negative" }
      ]
    },

    {
      id: "from_import", name: "from ... import", tag: "Modules", stands: "import specific tools",
      blurb: "Imports only the parts you need from a module.",
      what: "from module import name brings in a specific function or value so you can use it directly, without the module prefix.",
      why: "When you only need one or two tools from a big module, importing them directly keeps code short.",
      how: "Write from math import sqrt, then call sqrt(9) directly. Avoid 'from module import *' which hides where names come from.",
      when: "Use it when you frequently use a few specific items from a module.",
      mistakes: ["Using 'from module import *', which can clash with your own names.", "Forgetting that the module prefix is no longer needed (write sqrt, not math.sqrt)."],
      examples: [
        { label: "Beginner example", code: "from math import sqrt, pi\nprint(sqrt(25))\nprint(round(pi, 2))", output: "5.0\n3.14" }
      ]
    },
    {
      id: "pip", name: "pip", tag: "Modules", stands: "Python's package installer",
      blurb: "Installs extra libraries from the internet.",
      what: "pip is the tool that downloads and installs third-party packages (libraries) so your project can use them.",
      why: "Python's community has thousands of ready-made libraries. pip is how you add them to your project.",
      how: "Run it in your terminal (not inside Python): pip install package_name. List installed ones with pip list.",
      when: "Use it whenever you need a library that isn't built into Python (requests, pandas, numpy...).",
      mistakes: ["Running pip commands inside the Python interpreter instead of the terminal.", "Installing globally instead of inside a virtual environment for a project."],
      examples: [
        { label: "In your terminal", code: "# Run these in your terminal, not in Python:\n# pip install requests\n# pip list", output: "Successfully installed requests-2.31.0" }
      ]
    },
    {
      id: "standard_library", name: "Standard Library", tag: "Modules", stands: "built-in modules",
      blurb: "The toolbox of modules that ships with Python.",
      what: "The standard library is the large set of modules included with Python — math, random, datetime, os, json, and many more — no install needed.",
      why: "Most common tasks already have a tested solution in the standard library, so you rarely start from scratch.",
      how: "Just import the module you need (e.g. import json) — these come with Python automatically.",
      when: "Reach for the standard library before installing third-party packages.",
      mistakes: ["Re-writing functionality that already exists in a standard module.", "Confusing standard-library modules (built in) with pip packages (must be installed)."],
      examples: [
        { label: "Beginner example", code: "import math\nimport random\nprint(math.pi)\nprint(type(random))", output: "3.141592653589793\n<class 'module'>" }
      ]
    },
    {
      id: "math", name: "math module", tag: "Modules", stands: "mathematical tools",
      blurb: "Functions and constants for math.",
      what: "The math module provides mathematical functions (sqrt, ceil, floor, factorial) and constants (pi, e).",
      why: "Beyond basic + - * /, real programs need square roots, rounding, trigonometry, and constants.",
      how: "import math, then use math.sqrt(), math.pi, math.ceil(), etc.",
      when: "Use it for any calculation beyond simple arithmetic.",
      mistakes: ["Forgetting the math. prefix (sqrt(9) instead of math.sqrt(9)).", "Using math.pow() when ** is simpler for powers."],
      examples: [
        { label: "Beginner example", code: "import math\nprint(math.sqrt(16))\nprint(math.factorial(5))\nprint(math.ceil(4.1))", output: "4.0\n120\n5" }
      ]
    },
    {
      id: "random", name: "random module", tag: "Modules", stands: "randomness",
      blurb: "Generate random numbers and choices.",
      what: "The random module produces random results — random numbers, random picks from a list, shuffling.",
      why: "Games, simulations, and sampling all need unpredictability. random provides it.",
      how: "import random, then use random.randint(a, b), random.choice(list), or random.shuffle(list).",
      when: "Use it for games, randomized tests, sampling, or shuffling.",
      mistakes: ["Expecting randint(1, 6) to exclude 6 — unlike range, randint includes both ends.", "Needing reproducible results but forgetting random.seed()."],
      examples: [
        { label: "Beginner example", code: "import random\nprint(random.randint(1, 6))\nprint(random.choice([\"a\", \"b\", \"c\"]))", output: "4\nb" }
      ]
    },
    {
      id: "datetime", name: "datetime module", tag: "Modules", stands: "dates and times",
      blurb: "Work with dates, times, and durations.",
      what: "The datetime module represents and manipulates dates and times — today's date, differences, formatting.",
      why: "Apps constantly deal with time — timestamps, ages, deadlines, scheduling.",
      how: "from datetime import date / datetime, then use date.today() or build specific dates.",
      when: "Use it whenever your program records or calculates with dates and times.",
      mistakes: ["Confusing the datetime module with the datetime class inside it.", "Forgetting to format dates for display with strftime()."],
      examples: [
        { label: "Beginner example", code: "from datetime import date\nd = date(2026, 1, 15)\nprint(d)\nprint(d.year)", output: "2026-01-15\n2026" }
      ]
    },
    {
      id: "os", name: "os module", tag: "Modules", stands: "operating system tools",
      blurb: "Interact with files, folders, and the OS.",
      what: "The os module lets your program work with the operating system — paths, folders, environment variables.",
      why: "Real programs create folders, list files, and build file paths that work on any operating system.",
      how: "import os, then use os.path.join(), os.path.basename(), os.listdir(), os.makedirs(), etc.",
      when: "Use it for file/folder operations and building cross-platform paths.",
      mistakes: ["Building paths by gluing strings with / instead of os.path.join().", "Assuming a folder exists — check with os.path.exists() first."],
      examples: [
        { label: "Beginner example", code: "import os\nprint(os.path.basename(\"/home/user/report.pdf\"))", output: "report.pdf" }
      ]
    },
    {
      id: "sys", name: "sys module", tag: "Modules", stands: "Python interpreter info",
      blurb: "Access interpreter settings and arguments.",
      what: "The sys module gives access to things tied to the Python interpreter — command-line arguments, the version, and exiting the program.",
      why: "Command-line tools need their inputs (sys.argv) and a way to stop (sys.exit).",
      how: "import sys, then read sys.argv (arguments), sys.version, or call sys.exit().",
      when: "Use it for command-line scripts and interpreter-level control.",
      mistakes: ["Forgetting sys.argv[0] is the script name, so real arguments start at index 1.", "Confusing sys (interpreter) with os (operating system)."],
      examples: [
        { label: "Beginner example", code: "import sys\nprint(sys.version_info.major)", output: "3" }
      ]
    },

    {
      id: "objects", name: "Objects", tag: "OOP", stands: "instances of a class",
      blurb: "The actual 'things' built from a class.",
      what: "An object is a concrete thing created from a class blueprint. One Dog class can make many dog objects, each with its own data.",
      why: "Classes describe a type; objects are the real items you actually use and store.",
      how: "Create an object by calling the class like a function: my_dog = Dog(\"Rex\"). Access its data with my_dog.name.",
      when: "Use objects to model individual real-world items (a specific user, car, or account).",
      mistakes: ["Confusing the class (the blueprint) with an object (one built from it).", "Forgetting to create the object before using it."],
      examples: [
        { label: "Beginner example", code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\ndog1 = Dog(\"Rex\")\ndog2 = Dog(\"Bella\")\nprint(dog1.name)\nprint(dog2.name)", output: "Rex\nBella" }
      ]
    },
    {
      id: "init", name: "__init__()", tag: "OOP", stands: "the constructor",
      blurb: "Sets up a new object's starting data.",
      what: "__init__ is a special method that runs automatically when you create an object. It sets up the object's initial attributes.",
      why: "Most objects need starting data (a name, a balance). __init__ is where that setup happens.",
      how: "Define def __init__(self, ...): inside the class and assign self.attribute = value. self refers to the object being created.",
      when: "Add an __init__ whenever your objects need initial values.",
      mistakes: ["Forgetting self as the first parameter.", "Writing init or _init_ instead of the exact __init__ (double underscores)."],
      examples: [
        { label: "Beginner example", code: "class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\np = Person(\"Omar\", 20)\nprint(p.name, p.age)", output: "Omar 20" }
      ]
    },
    {
      id: "methods", name: "Methods", tag: "OOP", stands: "functions inside a class",
      blurb: "Actions an object can perform.",
      what: "A method is a function defined inside a class. It describes something the object can do, and can use the object's own data.",
      why: "Objects aren't just data — they have behavior. Methods are how objects act.",
      how: "Define functions inside the class with self as the first parameter, then call them with object.method().",
      when: "Use methods to give your objects actions (a Dog that can bark, an Account that can deposit).",
      mistakes: ["Forgetting self as the first parameter of every method.", "Calling a method without parentheses (d.bark instead of d.bark())."],
      examples: [
        { label: "Beginner example", code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return self.name + \" says Woof!\"\n\nprint(Dog(\"Rex\").bark())", output: "Rex says Woof!" }
      ]
    },
    {
      id: "attributes", name: "Attributes", tag: "OOP", stands: "data stored on an object",
      blurb: "The variables that belong to an object.",
      what: "Attributes are the pieces of data stored inside an object — like a car's color or a person's age.",
      why: "Objects need to remember their own state. Attributes are that memory.",
      how: "Set them in __init__ with self.name = value, and read or change them with object.name.",
      when: "Use attributes to store everything an object needs to remember.",
      mistakes: ["Forgetting the self. prefix when setting attributes inside a method.", "Misspelling an attribute name, which silently creates a new one."],
      examples: [
        { label: "Beginner example", code: "class Car:\n    def __init__(self, color):\n        self.color = color\n\nc = Car(\"red\")\nprint(c.color)\nc.color = \"blue\"\nprint(c.color)", output: "red\nblue" }
      ]
    },
    {
      id: "inheritance", name: "Inheritance", tag: "OOP", stands: "reuse a parent class",
      blurb: "A class that builds on another class.",
      what: "Inheritance lets a new class (child) reuse and extend the attributes and methods of an existing class (parent).",
      why: "It avoids repeating shared code — common behavior lives in the parent, special behavior in the children.",
      how: "Define class Child(Parent):. The child gets the parent's methods and can override them or add new ones.",
      when: "Use it when several classes share behavior but also have their own differences.",
      mistakes: ["Overusing inheritance for things that aren't truly 'is-a' relationships.", "Forgetting to call the parent's __init__ when overriding it."],
      examples: [
        { label: "Beginner example", code: "class Animal:\n    def speak(self):\n        print(\"Some sound\")\n\nclass Dog(Animal):\n    def speak(self):\n        print(\"Woof!\")\n\nDog().speak()\nAnimal().speak()", output: "Woof!\nSome sound" }
      ]
    },
    {
      id: "encapsulation", name: "Encapsulation", tag: "OOP", stands: "bundle & protect data",
      blurb: "Keep an object's data safe and controlled.",
      what: "Encapsulation means bundling data and the methods that use it together, and controlling access so data isn't changed carelessly.",
      why: "Protecting an object's internals prevents bugs from outside code changing data in invalid ways.",
      how: "Keep attributes private with a leading underscore (self.__balance) and expose safe methods (deposit, get_balance).",
      when: "Use it when an object's data should only change through controlled, validated methods.",
      mistakes: ["Exposing every attribute publicly when some should be controlled.", "Thinking Python's __ truly hides data — it only name-mangles, by convention."],
      examples: [
        { label: "Beginner example", code: "class Account:\n    def __init__(self):\n        self.__balance = 0\n    def deposit(self, amount):\n        self.__balance += amount\n    def get_balance(self):\n        return self.__balance\n\na = Account()\na.deposit(100)\nprint(a.get_balance())", output: "100" }
      ]
    },
    {
      id: "polymorphism", name: "Polymorphism", tag: "OOP", stands: "many forms",
      blurb: "Same method name, different behavior.",
      what: "Polymorphism lets different classes define the same method name, each behaving in its own way, so you can treat them uniformly.",
      why: "It lets you write code that works with many types without caring exactly which one it has.",
      how: "Give different classes a method with the same name (like sound()), then call it on any of them in a loop.",
      when: "Use it when several types share an action but implement it differently.",
      mistakes: ["Expecting identical behavior — each class's method can do something different.", "Forgetting the method must exist on every type you treat the same way."],
      examples: [
        { label: "Beginner example", code: "class Cat:\n    def sound(self):\n        return \"Meow\"\nclass Dog:\n    def sound(self):\n        return \"Woof\"\n\nfor a in [Cat(), Dog()]:\n    print(a.sound())", output: "Meow\nWoof" }
      ]
    },
    {
      id: "abstraction", name: "Abstraction", tag: "OOP", stands: "hide the details",
      blurb: "Expose what to do, hide how it's done.",
      what: "Abstraction means hiding complex inner details behind a simple interface, so users of a class only see what they need.",
      why: "It lets people use powerful objects without understanding their internals — like driving a car without knowing the engine.",
      how: "Provide clear methods and hide the messy implementation. Abstract base classes (abc module) can require child classes to implement certain methods.",
      when: "Use it to design clean, easy-to-use classes and to enforce a common interface.",
      mistakes: ["Exposing too much internal detail, making the class hard to use.", "Forgetting to implement an abstract method in a subclass (raises an error)."],
      examples: [
        { label: "Beginner example", code: "from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self):\n        pass\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n    def area(self):\n        return self.side ** 2\n\nprint(Square(4).area())", output: "16" }
      ]
    },

    {
      id: "lambda", name: "Lambda Functions", tag: "Advanced", stands: "tiny anonymous functions",
      blurb: "One-line functions with no name.",
      what: "A lambda is a small, unnamed function written in a single line: lambda arguments: expression.",
      why: "For quick, throwaway functions (like a sort key), defining a full function with def is overkill.",
      how: "Write lambda x: x * 2 and use it where a short function is expected, e.g. sorted(data, key=lambda p: p[1]).",
      when: "Use it for simple, short functions passed to map, filter, sorted, etc.",
      mistakes: ["Cramming complex logic into a lambda — use a normal def for anything non-trivial.", "Assigning a lambda to a name when a regular def would be clearer."],
      examples: [
        { label: "Beginner example", code: "double = lambda x: x * 2\nprint(double(5))\n\npairs = [(1, \"b\"), (2, \"a\")]\nprint(sorted(pairs, key=lambda p: p[1]))", output: "10\n[(2, 'a'), (1, 'b')]" }
      ]
    },
    {
      id: "dict_comprehension", name: "Dictionary Comprehension", tag: "Advanced", stands: "build dicts in one line",
      blurb: "Create a dictionary from a loop compactly.",
      what: "A dictionary comprehension builds a dict in one line: {key: value for item in sequence}.",
      why: "It's a concise, readable way to construct a dictionary from existing data.",
      how: "Write {expr_key: expr_value for item in sequence}, optionally with an if filter.",
      when: "Use it for short, clear transformations of data into key–value pairs.",
      mistakes: ["Using square brackets [] (that's a list comprehension) instead of {}.", "Making it too complex to read — use a normal loop then."],
      examples: [
        { label: "Beginner example", code: "squares = {n: n * n for n in range(1, 4)}\nprint(squares)", output: "{1: 1, 2: 4, 3: 9}" }
      ]
    },
    {
      id: "generators", name: "Generators", tag: "Advanced", stands: "produce values lazily",
      blurb: "Functions that yield items one at a time.",
      what: "A generator is a function that produces values one at a time using yield, instead of building a whole list in memory.",
      why: "For large or endless sequences, generating values on demand saves a lot of memory.",
      how: "Write a function that uses yield instead of return, then loop over the result like any sequence.",
      when: "Use generators for big data streams or sequences where you don't need everything at once.",
      mistakes: ["Expecting to index a generator like a list (you can only iterate it).", "Reusing a generator after it's exhausted — it produces nothing the second time."],
      examples: [
        { label: "Beginner example", code: "def count_up(n):\n    for i in range(1, n + 1):\n        yield i\n\nfor x in count_up(3):\n    print(x)", output: "1\n2\n3" }
      ]
    },
    {
      id: "yield", name: "yield", tag: "Advanced", stands: "give a value, then pause",
      blurb: "Produces a value and pauses the function.",
      what: "yield sends a value out of a generator and pauses the function, resuming from that point next time a value is requested.",
      why: "It's what makes generators able to produce a stream of values lazily, one at a time.",
      how: "Use yield instead of return inside a function. Each call to next() (or each loop step) runs until the next yield.",
      when: "Use it inside generator functions to emit a sequence of values over time.",
      mistakes: ["Mixing yield and a value-returning return in confusing ways.", "Expecting the function to run fully at once — it pauses at each yield."],
      examples: [
        { label: "Beginner example", code: "def gen():\n    yield \"a\"\n    yield \"b\"\n\ng = gen()\nprint(next(g))\nprint(next(g))", output: "a\nb" }
      ]
    },
    {
      id: "iterators", name: "Iterators", tag: "Advanced", stands: "objects you can loop",
      blurb: "Objects that produce items one by one.",
      what: "An iterator is an object you can step through one item at a time using next(). for loops use iterators behind the scenes.",
      why: "Iterators are the common interface that lets for loops work on lists, strings, files, and generators alike.",
      how: "Get one with iter(sequence) and pull items with next(). A for loop does this automatically.",
      when: "You mostly use them indirectly via for loops; use iter()/next() for manual control.",
      mistakes: ["Calling next() past the end, which raises StopIteration.", "Confusing an iterable (can be looped) with an iterator (the thing doing the stepping)."],
      examples: [
        { label: "Beginner example", code: "nums = [10, 20]\nit = iter(nums)\nprint(next(it))\nprint(next(it))", output: "10\n20" }
      ]
    },
    {
      id: "decorators", name: "Decorators", tag: "Advanced", stands: "wrap a function",
      blurb: "Add behavior to a function without changing it.",
      what: "A decorator is a function that wraps another function to add behavior (logging, timing, access checks) before or after it runs.",
      why: "It lets you reuse extra behavior across many functions without copying code into each one.",
      how: "Write a wrapper function, then apply it with @decorator_name above the function you want to enhance.",
      when: "Use decorators for cross-cutting features — logging, authentication, caching, timing.",
      mistakes: ["Forgetting the wrapper must return (and usually call) the inner function.", "Decorator order matters when stacking several @decorators."],
      examples: [
        { label: "Beginner example", code: "def shout(func):\n    def wrapper():\n        return func().upper()\n    return wrapper\n\n@shout\ndef greet():\n    return \"hello\"\n\nprint(greet())", output: "HELLO" }
      ]
    },
    {
      id: "context_managers", name: "Context Managers", tag: "Advanced", stands: "setup & cleanup with 'with'",
      blurb: "Run setup and guaranteed cleanup around a block.",
      what: "A context manager defines what happens when you enter and exit a with block — guaranteeing cleanup like closing files or releasing locks.",
      why: "Resources must be released even if errors occur. Context managers make that automatic and reliable.",
      how: "Use existing ones with 'with resource as x:', or build your own with __enter__ and __exit__ methods.",
      when: "Use them for anything that needs guaranteed cleanup — files, network connections, locks.",
      mistakes: ["Forgetting __exit__ must accept the three extra error parameters.", "Doing manual cleanup when a with block would be safer."],
      examples: [
        { label: "Beginner example", code: "class Timer:\n    def __enter__(self):\n        print(\"start\")\n        return self\n    def __exit__(self, *args):\n        print(\"end\")\n\nwith Timer():\n    print(\"working\")", output: "start\nworking\nend" }
      ]
    },

    {
      id: "install_python", name: "Installing Python", tag: "Environment", stands: "set up Python",
      blurb: "Get Python onto your computer.",
      what: "Installing Python puts the interpreter (the program that runs Python code) on your machine so you can write and run programs.",
      why: "Your code can't run until the Python interpreter is installed.",
      how: "Download the latest version from python.org, run the installer, and on Windows tick 'Add Python to PATH'. Then verify in a terminal.",
      when: "Do this once before you start coding, and update occasionally for new features.",
      mistakes: ["On Windows, forgetting to tick 'Add Python to PATH', so the 'python' command isn't found.", "Having several Python versions and not knowing which one runs."],
      examples: [
        { label: "Verify the install", code: "# After installing, run this in your terminal:\n# python --version", output: "Python 3.12.0" }
      ]
    },
    {
      id: "interpreter", name: "Python Interpreter", tag: "Environment", stands: "runs your code",
      blurb: "The program that executes Python.",
      what: "The interpreter reads your Python code and runs it line by line. You can also use it interactively (the REPL) to test snippets.",
      why: "It's what turns the text you write into actual actions on the computer.",
      how: "Type 'python' in a terminal to open the interactive interpreter, type expressions, and use exit() to leave.",
      when: "Use the interactive interpreter to quickly test ideas; use files for real programs.",
      mistakes: ["Confusing the interactive >>> prompt with your normal terminal prompt.", "Forgetting to exit() the interpreter before running other commands."],
      examples: [
        { label: "Interactive session", code: "# In the terminal type: python\n# >>> 5 * 3\n# 15\n# >>> exit()", output: "15" }
      ]
    },
    {
      id: "running_files", name: "Running Python Files", tag: "Environment", stands: "run a .py program",
      blurb: "Execute a saved Python file.",
      what: "Running a file tells Python to execute all the code in a .py file from top to bottom.",
      why: "Real programs live in files you save and run, not typed line by line.",
      how: "Save your code as app.py, open a terminal in that folder, and run: python app.py.",
      when: "Use this for any program longer than a quick test.",
      mistakes: ["Running the command from the wrong folder, so Python can't find the file.", "Naming a file the same as a module (e.g. math.py), which breaks imports."],
      examples: [
        { label: "Run a file", code: "# Save this as hello.py, then run:  python hello.py\nprint(\"Hello from a file!\")", output: "Hello from a file!" }
      ]
    },
    {
      id: "venv", name: "Virtual Environment", tag: "Environment", stands: "isolated project setup",
      blurb: "A private package space for each project.",
      what: "A virtual environment is an isolated folder holding a project's own Python and packages, separate from other projects.",
      why: "Different projects need different package versions. Virtual environments stop them from clashing.",
      how: "Create one with 'python -m venv venv', then activate it before installing packages with pip.",
      when: "Create a fresh virtual environment for every new project.",
      mistakes: ["Installing packages globally instead of inside the activated environment.", "Forgetting to activate the environment before running the project."],
      examples: [
        { label: "Create & activate", code: "# In your terminal:\n# python -m venv venv\n# venv\\Scripts\\activate      (Windows)\n# source venv/bin/activate   (Mac/Linux)", output: "(venv) packages now install locally" }
      ]
    },
    {
      id: "package_management", name: "Package Management", tag: "Environment", stands: "manage libraries",
      blurb: "Install, update, and remove libraries.",
      what: "Package management is how you add, upgrade, and remove the external libraries your project depends on, usually with pip.",
      why: "Projects rely on libraries that change over time; you need a reliable way to control them.",
      how: "Use pip install / pip uninstall / pip list, and save your set with pip freeze > requirements.txt.",
      when: "Whenever you add a new library or share your project with others.",
      mistakes: ["Not recording dependencies, so others can't reproduce your setup.", "Upgrading packages blindly and breaking your project."],
      examples: [
        { label: "Common commands", code: "# In your terminal:\n# pip install requests\n# pip freeze > requirements.txt", output: "Saved installed packages to requirements.txt" }
      ]
    },

    {
      id: "clean_code", name: "Clean Code", tag: "Best Practices", stands: "readable, simple code",
      blurb: "Writing code that's easy to read and change.",
      what: "Clean code is code that other people (and future you) can read and understand easily — clear names, small functions, no clutter.",
      why: "Code is read far more often than it's written. Clean code saves time and prevents bugs.",
      how: "Use descriptive names, keep functions short and focused, avoid repetition, and remove dead code.",
      when: "Aim for clean code always — it's a habit, not an afterthought.",
      mistakes: ["Cryptic one-letter names like x and tmp everywhere.", "Giant functions that try to do many things at once."],
      examples: [
        { label: "Clear names & steps", code: "radius = 5\narea = 3.14 * radius * radius\nprint(area)", output: "78.5" }
      ]
    },
    {
      id: "pep8", name: "PEP 8", tag: "Best Practices", stands: "Python style guide",
      blurb: "The official style rules for Python code.",
      what: "PEP 8 is Python's official style guide — recommendations for naming, spacing, and layout that keep code consistent.",
      why: "Consistent style makes code easier to read and collaborate on across the whole Python world.",
      how: "Use snake_case for variables, 4-space indentation, spaces around operators, and lines under ~79 characters. Tools like flake8 or black help.",
      when: "Follow PEP 8 in all your Python code, especially shared projects.",
      mistakes: ["Using camelCase for variables (that's for other languages).", "Inconsistent indentation or spacing within a file."],
      examples: [
        { label: "PEP 8 style", code: "total_price = 10 + 5\nif total_price > 10:\n    print(\"Expensive\")", output: "Expensive" }
      ]
    },
    {
      id: "debugging", name: "Debugging", tag: "Best Practices", stands: "find and fix bugs",
      blurb: "Tracking down why code misbehaves.",
      what: "Debugging is the process of finding and fixing errors in your program — figuring out why it doesn't do what you expect.",
      why: "Every programmer writes bugs. Debugging is the skill of fixing them efficiently.",
      how: "Read the error message and its line number, add print() statements to inspect values, or use a debugger to step through code.",
      when: "Whenever your program crashes or produces the wrong result.",
      mistakes: ["Ignoring the error message instead of reading it (it usually tells you the exact problem).", "Changing many things at once, so you can't tell what fixed it."],
      examples: [
        { label: "Print debugging", code: "def divide(a, b):\n    print(\"a =\", a, \"b =\", b)\n    return a / b\n\nprint(divide(10, 2))", output: "a = 10 b = 2\n5.0" }
      ]
    },
    {
      id: "testing", name: "Testing", tag: "Best Practices", stands: "verify code works",
      blurb: "Checking that your code does what it should.",
      what: "Testing is writing extra code that checks your real code behaves correctly, catching mistakes automatically.",
      why: "Manual checking is slow and easy to forget. Tests catch broken behavior instantly when you change something.",
      how: "Start with assert statements, then grow into frameworks like unittest or pytest for bigger projects.",
      when: "Test important logic, and re-run tests every time you change the code.",
      mistakes: ["Only testing the 'happy path' and ignoring edge cases (empty input, zero, negatives).", "Never running the tests after making changes."],
      examples: [
        { label: "Simple assertions", code: "def add(a, b):\n    return a + b\n\nassert add(2, 3) == 5\nassert add(-1, 1) == 0\nprint(\"All tests passed!\")", output: "All tests passed!" }
      ]
    },
    {
      id: "documentation", name: "Documentation", tag: "Best Practices", stands: "explain your code",
      blurb: "Notes that describe what code does.",
      what: "Documentation explains how to use your code — through docstrings inside functions and README files for projects.",
      why: "Code without docs is hard for others (and future you) to use correctly.",
      how: "Add a docstring (triple-quoted text) at the top of functions and classes describing what they do and their inputs/outputs.",
      when: "Document any function or project others will use — keep it short and accurate.",
      mistakes: ["Writing docs that drift out of date with the code.", "Documenting the obvious instead of the why and the how-to-use."],
      examples: [
        { label: "Docstring", code: "def area(radius):\n    \"\"\"Return the area of a circle given its radius.\"\"\"\n    return 3.14 * radius ** 2\n\nprint(area.__doc__)", output: "Return the area of a circle given its radius." }
      ]
    },
    {
      id: "code_organization", name: "Code Organization", tag: "Best Practices", stands: "structure your project",
      blurb: "Splitting code into clear, logical pieces.",
      what: "Code organization is arranging your program into functions, files, and folders so it stays understandable as it grows.",
      why: "A single giant file becomes impossible to manage. Good structure keeps large projects maintainable.",
      how: "Group related logic into functions, related functions into modules (files), and use a main() entry point.",
      when: "Start organizing as soon as a script grows beyond a few simple steps.",
      mistakes: ["Putting everything in one huge file.", "Mixing unrelated responsibilities in the same function or module."],
      examples: [
        { label: "Functions + main", code: "def greet(name):\n    return f\"Hi, {name}\"\n\ndef main():\n    print(greet(\"Omar\"))\n\nmain()", output: "Hi, Omar" }
      ]
    },

    {
      id: "regex", name: "Regular Expressions", tag: "Working with Data", stands: "pattern matching in text",
      blurb: "Search and match text using patterns.",
      what: "Regular expressions (regex) describe text patterns — like 'three digits, a dash, three digits' — to search, match, or extract from strings.",
      why: "Validating emails, finding phone numbers, or extracting data from messy text is far easier with patterns than manual code.",
      how: "Use the re module: re.search(pattern, text), re.findall(pattern, text). Patterns use symbols like \\d (digit) and + (one or more).",
      when: "Use them for validation and extracting structured data from text.",
      mistakes: ["Forgetting the r prefix on the pattern (use r\"\\d+\" for raw strings).", "Writing overly complex patterns that are hard to read and debug."],
      examples: [
        { label: "Find a pattern", code: "import re\ntext = \"Call me at 123-456\"\nmatch = re.search(r\"\\d{3}-\\d{3}\", text)\nprint(match.group())", output: "123-456" }
      ]
    },
    {
      id: "json_handling", name: "JSON Handling", tag: "Working with Data", stands: "text data format",
      blurb: "Convert between Python objects and JSON text.",
      what: "JSON is a common text format for data. The json module converts Python dicts/lists to JSON text (dumps) and back (loads).",
      why: "APIs and config files use JSON. You need to read it into Python and write Python data back out as JSON.",
      how: "Use json.dumps(obj) to make a JSON string and json.loads(text) to turn JSON text back into Python objects.",
      when: "Use it when working with web APIs, config files, or saving structured data as text.",
      mistakes: ["Confusing dumps/loads (strings) with dump/load (files).", "Expecting JSON keys to keep Python types — all JSON keys become strings."],
      examples: [
        { label: "Encode & decode", code: "import json\ndata = {\"name\": \"Omar\", \"age\": 20}\ntext = json.dumps(data)\nprint(text)\nback = json.loads(text)\nprint(back[\"name\"])", output: "{\"name\": \"Omar\", \"age\": 20}\nOmar" }
      ]
    },
    {
      id: "json_files", name: "JSON Files", tag: "Working with Data", stands: "save/load .json files",
      blurb: "Read and write data as .json files.",
      what: "json.dump() writes a Python object straight into a .json file, and json.load() reads one back into Python.",
      why: "Storing structured data (settings, records) in a .json file is a clean, standard way to persist it.",
      how: "Open a file and use json.dump(data, file) to save, json.load(file) to read.",
      when: "Use it to save and reload structured data between program runs.",
      mistakes: ["Mixing up dump/load (files) with dumps/loads (strings).", "Forgetting to open the file in the right mode ('w' to write, 'r' to read)."],
      examples: [
        { label: "Save & load", code: "import json\nwith open(\"data.json\", \"w\") as f:\n    json.dump({\"score\": 95}, f)\n\nwith open(\"data.json\") as f:\n    loaded = json.load(f)\nprint(loaded[\"score\"])", output: "95" }
      ]
    },
    {
      id: "csv_files", name: "CSV Files", tag: "Working with Data", stands: "comma-separated tables",
      blurb: "Read and write spreadsheet-like data.",
      what: "CSV files store table data as lines of comma-separated values. The csv module reads and writes them safely.",
      why: "Spreadsheets and many datasets are CSV. It's the simplest way to exchange tabular data.",
      how: "Use csv.writer to write rows and csv.reader (or csv.DictReader) to read them.",
      when: "Use it for exporting/importing rows of data, reports, and simple datasets.",
      mistakes: ["Splitting CSV lines manually with .split(',') — it breaks when values contain commas.", "Forgetting newline=\"\" when opening the file for writing on Windows."],
      examples: [
        { label: "Write rows", code: "import csv\nwith open(\"people.csv\", \"w\", newline=\"\") as f:\n    writer = csv.writer(f)\n    writer.writerow([\"name\", \"age\"])\n    writer.writerow([\"Omar\", 20])\nprint(\"CSV written\")", output: "CSV written" }
      ]
    },
    {
      id: "binary_files", name: "Binary Files", tag: "Working with Data", stands: "raw bytes, not text",
      blurb: "Handle non-text files like images.",
      what: "Binary files (images, audio, executables) store raw bytes, not text. You open them in binary mode ('rb'/'wb').",
      why: "Not all files are text. Reading an image or PDF as text would corrupt it — binary mode preserves the exact bytes.",
      how: "Open with mode 'rb' (read bytes) or 'wb' (write bytes). The data you get is of type bytes, not str.",
      when: "Use it for images, audio, video, or any non-text file.",
      mistakes: ["Opening a binary file in text mode, which corrupts the data.", "Trying to print bytes as if they were a normal string."],
      examples: [
        { label: "Read bytes", code: "with open(\"image.png\", \"rb\") as f:\n    data = f.read()\nprint(type(data))\nprint(len(data) > 0)", output: "<class 'bytes'>\nTrue" }
      ]
    },
    {
      id: "apis", name: "APIs", tag: "Working with Data", stands: "talk to web services",
      blurb: "Request data from other programs online.",
      what: "An API lets your program request data or actions from another service over the internet (like weather, maps, or payments).",
      why: "Most apps don't store all data themselves — they fetch live data from services through APIs.",
      how: "Install requests (pip install requests), then use requests.get(url) and read response.json().",
      when: "Use APIs to pull live data — weather, currency rates, social posts — into your program.",
      mistakes: ["Not checking response.status_code before using the data.", "Hard-coding secret API keys directly in your code."],
      examples: [
        { label: "GET request", code: "import requests\nresponse = requests.get(\"https://api.example.com/users\")\nprint(response.status_code)\ndata = response.json()", output: "200" }
      ]
    },
    {
      id: "database", name: "Database Connection", tag: "Working with Data", stands: "store data permanently",
      blurb: "Save and query data in a database.",
      what: "A database stores large amounts of structured data reliably. Python's built-in sqlite3 lets you create tables, insert, and query data.",
      why: "Files work for small data, but databases handle big data, searching, and many users safely.",
      how: "Connect with sqlite3.connect(), run SQL with a cursor's execute(), then commit() to save and close().",
      when: "Use a database when you have lots of structured records or need reliable querying.",
      mistakes: ["Forgetting to commit(), so changes aren't saved.", "Building SQL by joining strings (risking SQL injection) instead of using parameters."],
      examples: [
        { label: "SQLite example", code: "import sqlite3\nconn = sqlite3.connect(\"app.db\")\ncur = conn.cursor()\ncur.execute(\"CREATE TABLE IF NOT EXISTS users (name TEXT)\")\ncur.execute(\"INSERT INTO users VALUES ('Omar')\")\nconn.commit()\nprint(\"Saved to database\")\nconn.close()", output: "Saved to database" }
      ]
    },

    {
      id: "multithreading", name: "Multithreading", tag: "Concurrency", stands: "many tasks, one process",
      blurb: "Run several tasks seemingly at once.",
      what: "Multithreading runs multiple threads within one program, letting it handle several tasks (like downloads) without blocking.",
      why: "Waiting on slow tasks (network, disk) wastes time. Threads let other work continue meanwhile.",
      how: "Use the threading module: create Thread(target=func), call start(), and join() to wait for it.",
      when: "Use threads for I/O-bound work — waiting on networks, files, or user input.",
      mistakes: ["Expecting threads to speed up heavy CPU math (Python's GIL limits that — use multiprocessing).", "Sharing data between threads without protection, causing race conditions."],
      examples: [
        { label: "A thread", code: "import threading\n\ndef task(name):\n    print(\"Running\", name)\n\nt = threading.Thread(target=task, args=(\"A\",))\nt.start()\nt.join()\nprint(\"Done\")", output: "Running A\nDone" }
      ]
    },
    {
      id: "multiprocessing", name: "Multiprocessing", tag: "Concurrency", stands: "many processes, true parallelism",
      blurb: "Use multiple CPU cores at once.",
      what: "Multiprocessing runs code in separate processes, each with its own Python interpreter, achieving true parallelism across CPU cores.",
      why: "For heavy calculations, threads are limited by the GIL. Separate processes can truly run at the same time.",
      how: "Use the multiprocessing module: create Process(target=func), start() and join() it.",
      when: "Use it for CPU-heavy work — big computations, data crunching, image processing.",
      mistakes: ["Using it for simple I/O tasks where threads or async are lighter.", "Forgetting that processes don't share memory (data must be passed explicitly)."],
      examples: [
        { label: "A process", code: "from multiprocessing import Process\n\ndef work():\n    print(\"Working in a separate process\")\n\np = Process(target=work)\np.start()\np.join()\nprint(\"Finished\")", output: "Working in a separate process\nFinished" }
      ]
    },
    {
      id: "async", name: "Async Programming", tag: "Concurrency", stands: "non-blocking waiting",
      blurb: "Handle many waiting tasks efficiently.",
      what: "Async programming lets a single thread juggle many tasks that spend time waiting (network calls), switching between them while they wait.",
      why: "It handles thousands of simultaneous connections efficiently — ideal for web servers and network apps.",
      how: "Define functions with 'async def', pause on slow work with 'await', and run them with asyncio.run().",
      when: "Use it for high-concurrency I/O — web servers, many API calls, chat apps.",
      mistakes: ["Forgetting to await an async function (it then does nothing).", "Mixing blocking code into async functions, which freezes everything."],
      examples: [
        { label: "Async example", code: "import asyncio\n\nasync def main():\n    print(\"start\")\n    await asyncio.sleep(1)\n    print(\"end\")\n\nasyncio.run(main())", output: "start\nend" }
      ]
    },

    {
      id: "type_hints", name: "Type Hints", tag: "Modern Python", stands: "label expected types",
      blurb: "Note what types a function expects and returns.",
      what: "Type hints add optional labels showing what types variables and functions use — like (a: int, b: int) -> int.",
      why: "They make code clearer, help editors catch mistakes, and document intent — without changing how the code runs.",
      how: "Add ': type' to parameters and '-> type' for the return, e.g. def add(a: int, b: int) -> int.",
      when: "Use them in larger projects and shared code to improve clarity and tooling.",
      mistakes: ["Thinking hints are enforced at runtime — Python doesn't check them (tools like mypy do).", "Over-annotating tiny scripts where it adds clutter."],
      examples: [
        { label: "Hinted function", code: "def add(a: int, b: int) -> int:\n    return a + b\n\nprint(add(3, 4))", output: "7" }
      ]
    },
    {
      id: "dataclasses", name: "Dataclasses", tag: "Modern Python", stands: "classes for storing data",
      blurb: "Less boilerplate for data-holding classes.",
      what: "A dataclass automatically writes the repetitive parts of a class (__init__, __repr__, equality) for classes that mainly hold data.",
      why: "Writing __init__ and __repr__ by hand for simple data classes is tedious. Dataclasses do it for you.",
      how: "Add the @dataclass decorator above a class and just list the fields with type hints.",
      when: "Use them for classes that mostly group together related values (points, records, configs).",
      mistakes: ["Forgetting to import dataclass from the dataclasses module.", "Using a plain mutable default like [] for a field (use field(default_factory=list))."],
      examples: [
        { label: "A dataclass", code: "from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: int\n    y: int\n\np = Point(3, 4)\nprint(p)\nprint(p.x)", output: "Point(x=3, y=4)\n3" }
      ]
    },

    {
      id: "memory_management", name: "Memory Management", tag: "Advanced", stands: "how Python handles memory",
      blurb: "How Python stores and frees objects.",
      what: "Python manages memory for you: it tracks how many names reference each object and automatically frees objects no longer used (garbage collection).",
      why: "Understanding it helps you avoid surprises — like two variables pointing to the same list and both changing.",
      how: "You rarely manage memory directly. Be aware that assignment copies the reference, not the object; use copy() for a real copy.",
      when: "Think about it when objects are shared between variables or when handling very large data.",
      mistakes: ["Assuming b = a makes a copy — both names point to the same object.", "Holding references to huge objects you no longer need, keeping them in memory."],
      examples: [
        { label: "Shared reference", code: "a = [1, 2, 3]\nb = a            # same list, not a copy\nb.append(4)\nprint(a)", output: "[1, 2, 3, 4]" }
      ]
    },
    {
      id: "security_basics", name: "Security Basics", tag: "Advanced", stands: "write safer code",
      blurb: "Simple habits to keep programs safe.",
      what: "Security basics are habits that protect your program and its data — like never storing passwords in plain text and validating user input.",
      why: "Insecure code can leak data or be exploited. A few habits prevent the most common problems.",
      how: "Hash passwords (never store them raw), keep secrets out of code, validate all input, and use parameterized SQL queries.",
      when: "Apply these from the start of any program that handles user data or runs online.",
      mistakes: ["Storing passwords or API keys directly in your code.", "Trusting user input without validating it."],
      examples: [
        { label: "Hash a password", code: "import hashlib\npassword = \"secret123\"\nhashed = hashlib.sha256(password.encode()).hexdigest()\nprint(\"Stored as a hash, length:\", len(hashed))", output: "Stored as a hash, length: 64" }
      ]
    },

    {
      id: "file_paths", name: "File Paths", tag: "File Handling", stands: "locate files safely",
      blurb: "Build file locations that work everywhere.",
      what: "A file path describes where a file lives. The os.path tools build and inspect paths correctly on any operating system.",
      why: "Windows uses \\ and Mac/Linux use /. Building paths by hand breaks across systems; os.path handles it.",
      how: "Use os.path.join() to combine parts, os.path.basename() for the filename, and os.path.splitext() to split the extension.",
      when: "Use these whenever you build or inspect file locations.",
      mistakes: ["Gluing paths with hard-coded slashes instead of os.path.join().", "Assuming a relative path is relative to the file — it's relative to where you run the program."],
      examples: [
        { label: "Inspect a path", code: "import os\nprint(os.path.splitext(\"report.final.pdf\"))\nprint(os.path.basename(\"/home/user/report.pdf\"))", output: "('report.final', '.pdf')\nreport.pdf" }
      ]
    },
    {
      id: "directories", name: "Working with Directories", tag: "File Handling", stands: "manage folders",
      blurb: "Create, list, and check folders.",
      what: "The os module lets you create folders, list their contents, and check whether they exist.",
      why: "Programs often need to organize output into folders or scan a folder for files to process.",
      how: "Use os.makedirs(path, exist_ok=True) to create, os.listdir(path) to list, and os.path.exists(path) to check.",
      when: "Use it to organize files into folders or process every file in a directory.",
      mistakes: ["Calling os.makedirs() on an existing folder without exist_ok=True (raises an error).", "Assuming a folder exists instead of checking first."],
      examples: [
        { label: "Create & list", code: "import os\nos.makedirs(\"output\", exist_ok=True)\nprint(\"output\" in os.listdir(\".\"))", output: "True" }
      ]
    },

    {
      id: "name_main", name: "__name__ & __main__", tag: "Architecture", stands: "is this file the entry point?",
      blurb: "Run code only when the file is run directly.",
      what: "Every file has a built-in variable __name__. It equals \"__main__\" when the file is run directly, but the module's name when it's imported.",
      why: "It lets a file act as both a runnable program and an importable module without running its main code on import.",
      how: "Put your run-this-now code inside 'if __name__ == \"__main__\":' at the bottom of the file.",
      when: "Use it in any file that can be both run directly and imported elsewhere.",
      mistakes: ["Writing _name_ or 'main' instead of the exact __name__ / \"__main__\".", "Putting code that should only run directly outside the guard, so it runs on import too."],
      examples: [
        { label: "Entry-point guard", code: "def main():\n    print(\"Program started\")\n\nif __name__ == \"__main__\":\n    main()", output: "Program started" }
      ]
    },
    {
      id: "modules_structure", name: "Modules Structure", tag: "Architecture", stands: "organize code into files",
      blurb: "Each .py file is a reusable module.",
      what: "A module is simply a .py file containing functions, classes, and variables that other files can import and reuse.",
      why: "Splitting code into modules keeps each file focused and lets you reuse logic across a project.",
      how: "Put related functions in a file (e.g. math_utils.py), then import it elsewhere with 'import math_utils'.",
      when: "Create a new module whenever a file grows too big or holds a distinct responsibility.",
      mistakes: ["Naming a module the same as a standard library (e.g. random.py), which shadows it.", "Putting unrelated, mixed code in one module."],
      examples: [
        { label: "Module idea", code: "# math_utils.py defines:\ndef square(n):\n    return n * n\n\n# another file imports and uses it:\nprint(square(4))", output: "16" }
      ]
    },
    {
      id: "packages_structure", name: "Packages Structure", tag: "Architecture", stands: "folders of modules",
      blurb: "Group related modules into a package folder.",
      what: "A package is a folder containing modules (and usually an __init__.py file). It groups related modules under one name.",
      why: "Large projects have many modules. Packages organize them into a clean folder hierarchy.",
      how: "Make a folder with an __init__.py and your module files inside, then import like 'from myapp import models'.",
      when: "Use packages when a project grows beyond a handful of modules.",
      mistakes: ["Forgetting the __init__.py in older setups, so the folder isn't treated as a package.", "Creating deeply nested packages that are hard to navigate."],
      examples: [
        { label: "Package layout", code: "# A package is a folder of modules:\n# myapp/\n#   __init__.py\n#   models.py\n#   views.py\nprint(\"from myapp import models\")", output: "from myapp import models" }
      ]
    },
    {
      id: "package_installation", name: "Package Installation", tag: "Architecture", stands: "add external libraries",
      blurb: "Install third-party packages from PyPI.",
      what: "Package installation downloads libraries from PyPI (the Python Package Index) so your project can import and use them.",
      why: "You stand on the shoulders of the community — thousands of ready libraries save you from reinventing things.",
      how: "Use 'pip install package' (ideally inside a virtual environment), then import it in your code.",
      when: "Whenever you need functionality not in the standard library.",
      mistakes: ["Installing into the global Python instead of the project's virtual environment.", "Not pinning versions, so an update later breaks your project."],
      examples: [
        { label: "Install & use", code: "# In your terminal:\n# pip install pandas\n# Then in code:\n# import pandas as pd\nprint(\"Installed packages live in site-packages\")", output: "Installed packages live in site-packages" }
      ]
    },
    {
      id: "dependency_management", name: "Dependency Management", tag: "Architecture", stands: "track project libraries",
      blurb: "Record exactly what your project needs.",
      what: "Dependency management means tracking the exact libraries and versions your project relies on, so anyone can recreate the same setup.",
      why: "Without it, your project might work on your machine but break on someone else's due to different versions.",
      how: "Save your set with 'pip freeze > requirements.txt', and others install it with 'pip install -r requirements.txt'.",
      when: "Do it for any project you share, deploy, or revisit later.",
      mistakes: ["Forgetting to update requirements.txt after adding a new package.", "Not pinning versions, leading to 'works on my machine' problems."],
      examples: [
        { label: "Requirements file", code: "# In your terminal:\n# pip freeze > requirements.txt\n# pip install -r requirements.txt\nprint(\"requirements.txt lists your dependencies\")", output: "requirements.txt lists your dependencies" }
      ]
    },

    {
      id: "args_kwargs", name: "*args & **kwargs", tag: "Functions", stands: "flexible arguments",
      blurb: "Accept any number of arguments in a function.",
      what: "*args collects extra positional arguments into a tuple; **kwargs collects extra keyword arguments into a dictionary.",
      why: "Sometimes you don't know in advance how many arguments a function will get. These let it accept any number.",
      how: "Add *args and/or **kwargs as parameters. Inside, args is a tuple and kwargs is a dict you can loop over.",
      when: "Use them for wrapper functions, flexible APIs, or passing arguments through to other functions.",
      mistakes: ["Forgetting the * / ** stars (they're what makes it work).", "Mixing up order — regular params come first, then *args, then **kwargs."],
      examples: [
        { label: "Beginner example", code: "def total(*args):\n    return sum(args)\n\nprint(total(1, 2, 3, 4))\n\ndef info(**kwargs):\n    for k, v in kwargs.items():\n        print(k, \"=\", v)\n\ninfo(name=\"Omar\", age=20)", output: "10\nname = Omar\nage = 20" }
      ]
    },
    {
      id: "default_args", name: "Default & Keyword Arguments", tag: "Functions", stands: "optional, named inputs",
      blurb: "Give parameters default values and pass by name.",
      what: "Default arguments give a parameter a fallback value if the caller omits it. Keyword arguments pass values by name for clarity.",
      why: "Defaults make arguments optional; named arguments make calls readable and order-independent.",
      how: "Set defaults in the definition: def greet(name, greeting=\"Hello\"). Call with names: greet(\"Ali\", greeting=\"Hi\").",
      when: "Use defaults for common values, and keyword arguments when a call would otherwise be unclear.",
      mistakes: ["Using a mutable default like [] (it's shared across calls) — use None instead.", "Putting a parameter without a default after one with a default."],
      examples: [
        { label: "Beginner example", code: "def greet(name, greeting=\"Hello\"):\n    print(greeting + \", \" + name)\n\ngreet(\"Sara\")\ngreet(\"Ali\", greeting=\"Hi\")", output: "Hello, Sara\nHi, Ali" }
      ]
    },
    {
      id: "recursion", name: "Recursion", tag: "Functions", stands: "a function calling itself",
      blurb: "Solving a problem by calling the function on a smaller part.",
      what: "Recursion is when a function calls itself to solve smaller versions of a problem, until it reaches a simple base case.",
      why: "Some problems (factorials, tree structures, nested data) are naturally defined in terms of themselves.",
      how: "Write a base case that stops the recursion, and a recursive case that calls the function on a smaller input.",
      when: "Use it for problems that break into similar sub-problems — but a loop is often simpler.",
      mistakes: ["Forgetting the base case, causing infinite recursion (RecursionError).", "Using recursion where a simple loop would be clearer and faster."],
      examples: [
        { label: "Factorial", code: "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))", output: "120" }
      ]
    },
    {
      id: "ternary", name: "Ternary Expression", tag: "Control Flow", stands: "one-line if/else",
      blurb: "Choose a value in a single line.",
      what: "A ternary (conditional) expression picks one of two values based on a condition: value_if_true if condition else value_if_false.",
      why: "For simple either/or choices, it's shorter and cleaner than a full if/else block.",
      how: "Write: result = \"Adult\" if age >= 18 else \"Minor\".",
      when: "Use it for short, simple value choices — not for complex multi-branch logic.",
      mistakes: ["Cramming complex logic into one line, hurting readability.", "Forgetting the order: value first, then if, then else."],
      examples: [
        { label: "Beginner example", code: "age = 20\nstatus = \"Adult\" if age >= 18 else \"Minor\"\nprint(status)", output: "Adult" }
      ]
    },
    {
      id: "match_case", name: "match / case", tag: "Control Flow", stands: "structural pattern matching",
      blurb: "Cleanly handle many possible values (Python 3.10+).",
      what: "match/case compares a value against several patterns and runs the matching block — a modern, readable alternative to long if/elif chains.",
      why: "When a value has many possible cases, match/case is clearer than stacked elif statements.",
      how: "Write match value:, then case option: blocks. Use case _: as the catch-all default.",
      when: "Use it for menus, command handling, or matching one value against many options (Python 3.10 and newer).",
      mistakes: ["Using it on Python older than 3.10 (it doesn't exist there).", "Forgetting case _ for unmatched values."],
      examples: [
        { label: "Beginner example", code: "command = \"start\"\nmatch command:\n    case \"start\":\n        print(\"Starting...\")\n    case \"stop\":\n        print(\"Stopping...\")\n    case _:\n        print(\"Unknown\")", output: "Starting..." }
      ]
    },
    {
      id: "global_nonlocal", name: "global & nonlocal", tag: "Functions", stands: "change outer variables",
      blurb: "Let a function modify variables outside it.",
      what: "global lets a function change a variable defined at the file level; nonlocal lets a nested function change a variable in its enclosing function.",
      why: "By default a function can read outer variables but assigning creates a new local one. These keywords change that.",
      how: "Declare 'global name' (or 'nonlocal name') at the top of the function before assigning to that variable.",
      when: "Use them rarely — usually it's cleaner to return values instead of modifying outer variables.",
      mistakes: ["Overusing global, which makes code hard to follow and debug.", "Expecting a function to change an outer variable without declaring global/nonlocal."],
      examples: [
        { label: "Beginner example", code: "count = 0\ndef increase():\n    global count\n    count += 1\n\nincrease()\nincrease()\nprint(count)", output: "2" }
      ]
    },
    {
      id: "assert", name: "assert", tag: "Errors", stands: "check an assumption",
      blurb: "Crash early if a condition isn't true.",
      what: "assert checks that a condition is True. If it's False, the program stops with an AssertionError and an optional message.",
      why: "Catching wrong assumptions early — during development and testing — prevents harder-to-find bugs later.",
      how: "Write assert condition, \"error message\". If condition is False, it raises immediately.",
      when: "Use it for sanity checks and tests; not for validating normal user input (use if/raise for that).",
      mistakes: ["Relying on assert for production input checks — assertions can be disabled with python -O.", "Putting side effects inside an assert."],
      examples: [
        { label: "Beginner example", code: "def divide(a, b):\n    assert b != 0, \"b must not be zero\"\n    return a / b\n\nprint(divide(10, 2))", output: "5.0" }
      ]
    },
    {
      id: "truthiness", name: "Truthiness", tag: "Data Type", stands: "what counts as True",
      blurb: "How Python treats values as True or False.",
      what: "Every value is either 'truthy' or 'falsy'. Falsy values include 0, \"\", [], {}, None, and False; everything else is truthy.",
      why: "if and while rely on truthiness. Knowing what counts as falsy lets you write shorter, clearer conditions.",
      how: "Use a value directly in a condition: 'if my_list:' is True when the list is non-empty.",
      when: "Use it to check for 'empty' or 'has something' without comparing to len() or == .",
      mistakes: ["Assuming only False/0 are falsy — empty strings, lists, dicts, and None are too.", "Writing 'if len(x) > 0' when 'if x' says the same thing."],
      examples: [
        { label: "Beginner example", code: "if \"hello\":\n    print(\"Non-empty string is truthy\")\nif not \"\":\n    print(\"Empty string is falsy\")\nif not 0:\n    print(\"Zero is falsy\")", output: "Non-empty string is truthy\nEmpty string is falsy\nZero is falsy" }
      ]
    },
    {
      id: "mutability", name: "Mutability vs Immutability", tag: "Basics", stands: "can it change?",
      blurb: "Whether a value can be changed after creation.",
      what: "Mutable values (lists, dicts, sets) can be changed in place. Immutable values (strings, numbers, tuples) cannot — operations create new values.",
      why: "This explains many beginner surprises — like two variables sharing one list, or why a string method doesn't change the original.",
      how: "Remember: lists/dicts/sets change in place; strings/numbers/tuples don't. Use .copy() to avoid sharing mutable data.",
      when: "Keep it in mind whenever you assign one variable to another or pass values to functions.",
      mistakes: ["Expecting text.upper() to change the original string (strings are immutable).", "Two variables pointing to the same list — changing one changes both."],
      examples: [
        { label: "Beginner example", code: "nums = [1, 2, 3]\nnums[0] = 99      # lists are mutable\nprint(nums)\n\ntext = \"hello\"   # strings are immutable\nprint(text.upper())\nprint(text)", output: "[99, 2, 3]\nHELLO\nhello" }
      ]
    },
    {
      id: "type_casting", name: "Type Casting", tag: "Data Type", stands: "convert between types",
      blurb: "Change a value from one type to another.",
      what: "Type casting converts a value to a different type using functions like int(), float(), str(), list(), and bool().",
      why: "Data often arrives in the wrong type (text from input, numbers as strings). Casting puts it in the form you need.",
      how: "Wrap the value in the target type's function, e.g. int(\"42\"), str(100), list(\"abc\").",
      when: "Use it whenever a value's type doesn't match what an operation needs.",
      mistakes: ["Casting impossible values, e.g. int(\"hello\"), which raises a ValueError.", "Forgetting input() returns a string that must be cast before doing math."],
      examples: [
        { label: "Beginner example", code: "print(int(\"42\") + 8)\nprint(str(100) + \"%\")\nprint(float(\"3.14\"))\nprint(list(\"abc\"))", output: "50\n100%\n3.14\n['a', 'b', 'c']" }
      ]
    },
    {
      id: "constructors", name: "list() / dict() / set() / tuple()", tag: "Built-in Function", stands: "build collections",
      blurb: "Create collections from other values.",
      what: "These built-in functions create new collections — often by converting one type into another (a list into a set to drop duplicates, for example).",
      why: "You frequently need to convert between collection types or build an empty one to fill.",
      how: "Call list(x), set(x), tuple(x), or dict(...). list() makes a list, set() removes duplicates, and so on.",
      when: "Use them to convert collections or create empty ones.",
      mistakes: ["Calling set() expecting order to be preserved (sets are unordered).", "Passing the wrong shape to dict() (it needs pairs or keyword args)."],
      examples: [
        { label: "Beginner example", code: "print(list((1, 2, 3)))\nprint(tuple([4, 5]))\nprint(set([1, 1, 2]))\nprint(dict(name=\"Omar\"))", output: "[1, 2, 3]\n(4, 5)\n{1, 2}\n{'name': 'Omar'}" }
      ]
    },
    {
      id: "loop_else", name: "for/else & while/else", tag: "Control Flow", stands: "run after a loop finishes",
      blurb: "An else block that runs if the loop wasn't broken.",
      what: "A loop can have an else block that runs only if the loop finished normally (without hitting break).",
      why: "It's a clean way to do something 'if nothing was found' after a search loop, without an extra flag variable.",
      how: "Add else: after the loop body. It runs when the loop ends normally; it's skipped if break was used.",
      when: "Use it for search loops — the else runs when no match triggered a break.",
      mistakes: ["Expecting else to run after break — it only runs if break was NOT hit.", "Confusing loop-else with if-else; the loop's else ties to break."],
      examples: [
        { label: "Beginner example", code: "for n in range(3):\n    print(n)\nelse:\n    print(\"Finished without break\")", output: "0\n1\n2\nFinished without break" }
      ]
    },
    {
      id: "nested_loops", name: "Nested Loops", tag: "Control Flow", stands: "a loop inside a loop",
      blurb: "Loops placed inside other loops.",
      what: "A nested loop is a loop inside another loop. The inner loop runs fully for each single step of the outer loop.",
      why: "Grids, tables, and combinations all need looping in two (or more) dimensions.",
      how: "Indent one loop inside another. For each outer item, the inner loop repeats completely.",
      when: "Use them for 2D data (rows and columns), grids, or pairing every item with every other.",
      mistakes: ["Reusing the same variable name for both loops, causing confusion.", "Creating very deep nesting that's slow and hard to read."],
      examples: [
        { label: "Beginner example", code: "for i in range(1, 3):\n    for j in range(1, 3):\n        print(i, j)", output: "1 1\n1 2\n2 1\n2 2" }
      ]
    },

    {
      id: "str_join", name: "join()", tag: "String Methods", stands: "combine a list into text",
      blurb: "Joins a list of strings into one string.",
      what: "join() combines the items of a list into a single string, placing a chosen separator between them.",
      why: "It's the clean, efficient way to turn a list of words into a sentence or a CSV line — much better than adding strings in a loop.",
      how: "Call separator.join(list), e.g. \" \".join(words). The separator goes before .join().",
      when: "Use it to build text from a list — sentences, paths, comma-separated values.",
      mistakes: ["Writing list.join(sep) — it's the other way: sep.join(list).", "Joining a list that contains numbers (all items must be strings first)."],
      examples: [
        { label: "Beginner example", code: "words = [\"learn\", \"python\", \"today\"]\nprint(\" \".join(words))\nprint(\"-\".join(words))", output: "learn python today\nlearn-python-today" }
      ]
    },
    {
      id: "str_format", name: "format()", tag: "String Methods", stands: "fill in placeholders",
      blurb: "Inserts values into a string's { } slots.",
      what: "format() replaces { } placeholders in a string with the values you pass, in order.",
      why: "It's a flexible way to build strings with values — and the basis that f-strings improved on.",
      how: "Write \"Hello, {}!\".format(name). Numbered or named placeholders also work: \"{0} {1}\".format(a, b).",
      when: "Use it to build formatted text — though f-strings are usually simpler for new code.",
      mistakes: ["Mismatching the number of { } and the arguments given.", "Forgetting the dot — it's \"text {}\".format(x), called on the string."],
      examples: [
        { label: "Beginner example", code: "name = \"Omar\"\nprint(\"Hello, {}!\".format(name))\nprint(\"{} + {} = {}\".format(2, 3, 5))", output: "Hello, Omar!\n2 + 3 = 5" }
      ]
    },
    {
      id: "str_startswith", name: "startswith() / endswith()", tag: "String Methods", stands: "check the start or end",
      blurb: "Tests how a string begins or ends.",
      what: "startswith() returns True if a string begins with the given text; endswith() checks the ending. Both return a boolean.",
      why: "Validating prefixes/suffixes is common — does a URL start with https, does a file end with .png?",
      how: "Call text.startswith(\"prefix\") or text.endswith(\"suffix\").",
      when: "Use them to validate or filter text by how it begins or ends.",
      mistakes: ["Forgetting they're case-sensitive (\"HTTPS\" vs \"https\").", "Using slicing like text[:5] == \"https\" when these methods are clearer."],
      examples: [
        { label: "Beginner example", code: "url = \"https://site.com\"\nprint(url.startswith(\"https\"))\nprint(url.endswith(\".com\"))", output: "True\nTrue" }
      ]
    },
    {
      id: "str_count", name: "count() (string)", tag: "String Methods", stands: "count occurrences",
      blurb: "Counts how many times text appears.",
      what: "count() returns how many times a substring appears inside a string.",
      why: "Counting characters or words (vowels, repeats, separators) is a frequent text task.",
      how: "Call text.count(\"sub\"). It counts non-overlapping occurrences.",
      when: "Use it to tally how often something appears in text.",
      mistakes: ["Expecting it to count overlapping matches (it counts non-overlapping).", "Case sensitivity: count(\"a\") won't count \"A\"."],
      examples: [
        { label: "Beginner example", code: "text = \"banana\"\nprint(text.count(\"a\"))\nprint(text.count(\"na\"))", output: "3\n2" }
      ]
    },
    {
      id: "escape_sequences", name: "Escape Sequences", tag: "String Methods", stands: "special characters in text",
      blurb: "Backslash codes like \\n and \\t.",
      what: "Escape sequences are backslash codes inside strings that represent special characters: \\n is a new line, \\t a tab, \\\" a quote.",
      why: "Some characters (newlines, tabs, quotes) can't be typed directly inside a string — escapes represent them.",
      how: "Put a backslash before the code: \"line1\\nline2\". Use \\\" for a quote inside double quotes.",
      when: "Use them to add line breaks, tabs, or quotes inside strings.",
      mistakes: ["Forgetting the backslash, so \\n shows literally instead of a new line.", "Needing a literal backslash (a Windows path) — use a raw string r\"...\" instead."],
      examples: [
        { label: "Beginner example", code: "print(\"Line 1\\nLine 2\")\nprint(\"Name:\\tOmar\")", output: "Line 1\nLine 2\nName:	Omar" }
      ]
    },
    {
      id: "multiline_raw", name: "Multiline & Raw Strings", tag: "String Methods", stands: "long text & literal backslashes",
      blurb: "Triple-quoted text and r\"...\" strings.",
      what: "Triple quotes (\"\"\"...\"\"\") let a string span multiple lines. A raw string (r\"...\") treats backslashes literally, ignoring escape codes.",
      why: "Multiline strings are great for blocks of text; raw strings are perfect for Windows paths and regular expressions.",
      how: "Wrap text in triple quotes for multiple lines; prefix with r for a raw string where \\ stays a backslash.",
      when: "Use triple quotes for paragraphs/docstrings, raw strings for paths and regex patterns.",
      mistakes: ["Forgetting raw strings still can't end with a single backslash.", "Using normal strings for Windows paths, where \\n or \\t get misread."],
      examples: [
        { label: "Beginner example", code: "text = \"\"\"Line one\nLine two\"\"\"\nprint(text)\nprint(r\"C:\\new_folder\")", output: "Line one\nLine two\nC:\\new_folder" }
      ]
    },

    {
      id: "list_extend", name: "extend()", tag: "List Methods", stands: "add many items",
      blurb: "Adds all items from another list.",
      what: "extend() adds every item from another list (or any sequence) to the end of a list.",
      why: "append() adds one item; extend() merges in many at once.",
      how: "Call my_list.extend(other_list). It changes the list in place.",
      when: "Use it to merge a list of items into an existing list.",
      mistakes: ["Using append(other_list), which adds the whole list as one nested item.", "Writing my_list = my_list.extend(x) — extend returns None."],
      examples: [
        { label: "Beginner example", code: "a = [1, 2]\na.extend([3, 4])\nprint(a)", output: "[1, 2, 3, 4]" }
      ]
    },
    {
      id: "list_index", name: "index()", tag: "List Methods", stands: "find an item's position",
      blurb: "Returns the position of a value.",
      what: "index() returns the position (index) of the first item in a list that matches the value you give.",
      why: "Sometimes you need to know where an item sits, not just that it exists.",
      how: "Call my_list.index(value). It returns the index of the first match.",
      when: "Use it to locate where a known value lives in a list.",
      mistakes: ["Calling index() on a value that isn't there raises a ValueError — check with 'in' first.", "Expecting all positions — it only returns the first match."],
      examples: [
        { label: "Beginner example", code: "fruits = [\"apple\", \"banana\", \"cherry\"]\nprint(fruits.index(\"banana\"))", output: "1" }
      ]
    },
    {
      id: "list_count", name: "count() (list)", tag: "List Methods", stands: "count occurrences",
      blurb: "Counts how many times a value appears.",
      what: "count() returns how many times a given value appears in a list.",
      why: "Tallying repeats — votes, duplicates, frequencies — is a common need.",
      how: "Call my_list.count(value).",
      when: "Use it to count occurrences of a specific value in a list.",
      mistakes: ["Confusing it with len() (total items) — count() counts one specific value.", "Expecting it to count similar but different values."],
      examples: [
        { label: "Beginner example", code: "nums = [1, 2, 2, 3, 2]\nprint(nums.count(2))", output: "3" }
      ]
    },
    {
      id: "list_copy", name: "copy()", tag: "List Methods", stands: "make a separate copy",
      blurb: "Creates an independent copy of a list.",
      what: "copy() returns a new list with the same items, so changing the copy doesn't affect the original.",
      why: "Assigning b = a makes both names point to the SAME list. copy() gives a truly separate one.",
      how: "Call new_list = my_list.copy() (or list(my_list)).",
      when: "Use it whenever you need to change a list without affecting the original.",
      mistakes: ["Using b = a and expecting a separate copy (it isn't).", "copy() is a shallow copy — nested lists inside are still shared."],
      examples: [
        { label: "Beginner example", code: "a = [1, 2, 3]\nb = a.copy()\nb.append(4)\nprint(a)\nprint(b)", output: "[1, 2, 3]\n[1, 2, 3, 4]" }
      ]
    },
    {
      id: "list_clear", name: "clear()", tag: "List Methods", stands: "empty the list",
      blurb: "Removes every item from a list.",
      what: "clear() empties a list, leaving it with zero items, in place.",
      why: "Sometimes you need to reset a list to empty while keeping the same variable.",
      how: "Call my_list.clear().",
      when: "Use it to reset a list you'll refill, without making a new one.",
      mistakes: ["Setting my_list = [] when other names still point to the old list.", "Confusing clear() (empties) with del (removes the variable itself)."],
      examples: [
        { label: "Beginner example", code: "nums = [1, 2, 3]\nnums.clear()\nprint(nums)", output: "[]" }
      ]
    },
    {
      id: "neg_index_slice", name: "Negative Indexing & Slice Steps", tag: "List Methods", stands: "index from the end, step through",
      blurb: "Count from the end and skip with steps.",
      what: "Negative indexes count from the end (-1 is last). Slices can take a step: list[start:stop:step], and [::-1] reverses.",
      why: "Reaching the end of a sequence, taking every other item, or reversing are all extremely common.",
      how: "Use list[-1] for the last item, list[::2] for every second item, list[::-1] to reverse.",
      when: "Use them to read from the end, sample items, or reverse without a loop.",
      mistakes: ["Confusing -1 (last item) with index 1.", "Forgetting the stop index is excluded in slices."],
      examples: [
        { label: "Beginner example", code: "nums = [10, 20, 30, 40, 50]\nprint(nums[-1])\nprint(nums[1:4])\nprint(nums[::2])\nprint(nums[::-1])", output: "50\n[20, 30, 40]\n[10, 30, 50]\n[50, 40, 30, 20, 10]" }
      ]
    },

    {
      id: "dict_pop", name: "pop() (dict)", tag: "Dictionary Methods", stands: "remove & return by key",
      blurb: "Removes a key and returns its value.",
      what: "On a dictionary, pop(key) removes that key and returns its value. You can give a default to avoid an error if it's missing.",
      why: "Sometimes you want to take a value out of a dict and use it in one step.",
      how: "Call my_dict.pop(key) or my_dict.pop(key, default) for safety.",
      when: "Use it to remove and use a dictionary entry at the same time.",
      mistakes: ["pop() on a missing key with no default raises a KeyError.", "Confusing dict.pop(key) with list.pop(index)."],
      examples: [
        { label: "Beginner example", code: "person = {\"name\": \"Omar\", \"age\": 20}\nage = person.pop(\"age\")\nprint(age)\nprint(person)", output: "20\n{'name': 'Omar'}" }
      ]
    },
    {
      id: "dict_setdefault", name: "setdefault()", tag: "Dictionary Methods", stands: "get or set a default",
      blurb: "Returns a key's value, adding it if missing.",
      what: "setdefault(key, default) returns the value for a key, and if the key doesn't exist, adds it with the default first.",
      why: "It's a neat way to initialise dictionary entries — common when counting or grouping.",
      how: "Call my_dict.setdefault(key, default). The key is created with default only if absent.",
      when: "Use it when building dictionaries where keys may not exist yet (counters, groupings).",
      mistakes: ["Confusing it with get() (which never changes the dict).", "Forgetting it also returns the value, not just sets it."],
      examples: [
        { label: "Beginner example", code: "counts = {}\ncounts.setdefault(\"a\", 0)\ncounts[\"a\"] += 1\nprint(counts)", output: "{'a': 1}" }
      ]
    },
    {
      id: "del_statement", name: "del", tag: "Data Structure", stands: "delete a name or item",
      blurb: "Removes a variable or an item from a collection.",
      what: "del removes things — a variable, a list item by index, or a dictionary entry by key.",
      why: "Sometimes you need to permanently remove a name or an element, not just empty or reset it.",
      how: "Write del variable, del my_list[index], or del my_dict[key].",
      when: "Use it to delete specific items or free up a variable name.",
      mistakes: ["del on a missing index/key raises an error (IndexError/KeyError).", "Using the variable after deleting it raises a NameError."],
      examples: [
        { label: "Beginner example", code: "nums = [1, 2, 3]\ndel nums[0]\nprint(nums)\n\nperson = {\"a\": 1, \"b\": 2}\ndel person[\"a\"]\nprint(person)", output: "[2, 3]\n{'b': 2}" }
      ]
    },
    {
      id: "set_difference", name: "difference() / symmetric_difference()", tag: "Set Methods", stands: "what's not shared",
      blurb: "Items in one set but not the other.",
      what: "difference() returns items in the first set but not the second. symmetric_difference() returns items in either set but not both.",
      why: "Comparing groups — what's new, what's removed, what's unique to each — is a common task.",
      how: "Use a.difference(b) (or a - b) and a.symmetric_difference(b) (or a ^ b).",
      when: "Use them to compare two sets and find unique elements.",
      mistakes: ["Confusing difference (one-way) with symmetric_difference (both ways).", "Forgetting these return new sets, not changing the originals."],
      examples: [
        { label: "Beginner example", code: "a = {1, 2, 3}\nb = {2, 3, 4}\nprint(a.difference(b))\nprint(a.symmetric_difference(b))", output: "{1}\n{1, 4}" }
      ]
    },
    {
      id: "frozenset", name: "frozenset", tag: "Set Methods", stands: "an unchangeable set",
      blurb: "A set that can't be modified.",
      what: "A frozenset is an immutable version of a set — it has unique items but can't be changed after creation.",
      why: "Because it can't change, a frozenset can be used as a dictionary key or stored inside another set (a normal set can't).",
      how: "Create it with frozenset([items]). It supports all read operations (in, union, intersection) but no add/remove.",
      when: "Use it when you need a fixed set of unique values that won't change.",
      mistakes: ["Trying to add() or remove() from a frozenset (it's immutable).", "Forgetting why you'd use it — mainly to use a set as a key or set member."],
      examples: [
        { label: "Beginner example", code: "fs = frozenset([1, 2, 3])\nprint(fs)\nprint(2 in fs)", output: "frozenset({1, 2, 3})\nTrue" }
      ]
    },

    {
      id: "self_concept", name: "self", tag: "OOP", stands: "the object itself",
      blurb: "How a method refers to its own object.",
      what: "self is the first parameter of every method, automatically referring to the specific object the method was called on.",
      why: "Methods need a way to read and change their own object's data. self is that link.",
      how: "Make self the first parameter of each method, and use self.attribute to access the object's data. You don't pass it manually when calling.",
      when: "Use self inside every regular method to reach the object's own attributes and methods.",
      mistakes: ["Forgetting self as the first parameter (Python passes it automatically).", "Forgetting the self. prefix when accessing the object's attributes."],
      examples: [
        { label: "Beginner example", code: "class Counter:\n    def __init__(self):\n        self.value = 0\n    def increase(self):\n        self.value += 1\n\nc = Counter()\nc.increase()\nc.increase()\nprint(c.value)", output: "2" }
      ]
    },
    {
      id: "class_vs_instance", name: "Class vs Instance Variables", tag: "OOP", stands: "shared vs per-object data",
      blurb: "Data shared by all objects vs unique to each.",
      what: "A class variable is shared by every object of the class. An instance variable (set with self) is unique to each object.",
      why: "Some data belongs to the whole type (a species), other data belongs to one object (a name).",
      how: "Define class variables directly in the class body; set instance variables with self.x in __init__.",
      when: "Use class variables for shared constants/defaults, instance variables for per-object state.",
      mistakes: ["Changing a class variable through one object and surprising the rest.", "Putting per-object data as a class variable by mistake."],
      examples: [
        { label: "Beginner example", code: "class Dog:\n    species = \"Canine\"        # shared\n    def __init__(self, name):\n        self.name = name        # unique\n\na = Dog(\"Rex\")\nb = Dog(\"Bella\")\nprint(a.species, b.species)\nprint(a.name, b.name)", output: "Canine Canine\nRex Bella" }
      ]
    },
    {
      id: "super", name: "super()", tag: "OOP", stands: "call the parent class",
      blurb: "Runs a method from the parent class.",
      what: "super() lets a child class call a method (often __init__) from its parent, reusing the parent's setup before adding its own.",
      why: "Child classes usually want the parent's initialisation plus extra of their own — super() avoids copying the parent's code.",
      how: "Inside the child's method, call super().method(args), e.g. super().__init__(name) in the child's __init__.",
      when: "Use it in subclasses to extend (not fully replace) the parent's behavior.",
      mistakes: ["Forgetting to call super().__init__(), so the parent's setup is skipped.", "Re-writing the parent's code instead of reusing it with super()."],
      examples: [
        { label: "Beginner example", code: "class Animal:\n    def __init__(self, name):\n        self.name = name\n\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name)\n        self.breed = breed\n\nd = Dog(\"Rex\", \"Labrador\")\nprint(d.name, d.breed)", output: "Rex Labrador" }
      ]
    },
    {
      id: "property", name: "@property", tag: "OOP", stands: "method that acts like an attribute",
      blurb: "Access a computed value like a normal attribute.",
      what: "@property turns a method into a read-only attribute, so you call it without parentheses — useful for computed or protected values.",
      why: "It lets you compute a value on the fly (like area) while keeping a clean attribute-style interface.",
      how: "Put @property above a method that takes only self and returns a value; then read it as object.name (no parentheses).",
      when: "Use it for values derived from other data, or to control how an attribute is read.",
      mistakes: ["Calling it with parentheses (object.area()) — properties are accessed like attributes.", "Forgetting it makes the value read-only unless you add a setter."],
      examples: [
        { label: "Beginner example", code: "class Circle:\n    def __init__(self, radius):\n        self.radius = radius\n    @property\n    def area(self):\n        return 3.14 * self.radius ** 2\n\nc = Circle(5)\nprint(c.area)", output: "78.5" }
      ]
    },
    {
      id: "static_class_methods", name: "@staticmethod & @classmethod", tag: "OOP", stands: "methods not tied to one object",
      blurb: "Methods that don't need a specific object.",
      what: "A @staticmethod is a plain function grouped inside a class (no self). A @classmethod receives the class itself (cls) instead of an instance.",
      why: "Some helpers relate to a class but don't need a particular object's data; classmethods can build or describe the class.",
      how: "Add @staticmethod (no self) or @classmethod (first param cls) above the method.",
      when: "Use staticmethod for related utility functions, classmethod for alternative constructors or class-level info.",
      mistakes: ["Adding self to a staticmethod (it doesn't take one).", "Confusing the two — staticmethod gets nothing automatic, classmethod gets cls."],
      examples: [
        { label: "Beginner example", code: "class MathHelper:\n    @staticmethod\n    def add(a, b):\n        return a + b\n    @classmethod\n    def name(cls):\n        return cls.__name__\n\nprint(MathHelper.add(2, 3))\nprint(MathHelper.name())", output: "5\nMathHelper" }
      ]
    },
    {
      id: "dunder_methods", name: "Magic / Dunder Methods", tag: "Magic Methods", stands: "double-underscore methods",
      blurb: "Special methods like __str__ and __len__.",
      what: "Dunder (double-underscore) methods let your objects work with built-in features — __str__ controls printing, __len__ enables len(), __eq__ enables ==.",
      why: "They make your own classes behave like built-in types, so print(), len(), and == 'just work' on your objects.",
      how: "Define methods named with leading and trailing double underscores, e.g. def __str__(self): return ... .",
      when: "Use them to make your objects printable, comparable, or usable with built-in functions.",
      mistakes: ["Misspelling them (single underscores) so Python ignores them.", "Forgetting __str__ should return a string."],
      examples: [
        { label: "Beginner example", code: "class Book:\n    def __init__(self, title):\n        self.title = title\n    def __str__(self):\n        return \"Book: \" + self.title\n    def __len__(self):\n        return len(self.title)\n\nb = Book(\"Python\")\nprint(b)\nprint(len(b))", output: "Book: Python\n6" }
      ]
    },

    {
      id: "any_all", name: "any() & all()", tag: "Built-in Function", stands: "any true / all true",
      blurb: "Check if any or all items are truthy.",
      what: "any() returns True if at least one item in a sequence is truthy; all() returns True only if every item is truthy.",
      why: "Checking 'is anything true?' or 'is everything valid?' across a list is a frequent need.",
      how: "Pass a list (often of conditions) to any(...) or all(...). They return a single boolean.",
      when: "Use them with comprehensions to validate or check collections in one line.",
      mistakes: ["Remember all([]) is True and any([]) is False for empty lists.", "Confusing the two — any is 'at least one', all is 'every one'."],
      examples: [
        { label: "Beginner example", code: "nums = [1, 2, 0, 3]\nprint(any(nums))\nprint(all(nums))\nprint(all(n > 0 for n in [1, 2, 3]))", output: "True\nFalse\nTrue" }
      ]
    },
    {
      id: "reversed", name: "reversed()", tag: "Built-in Function", stands: "iterate backwards",
      blurb: "Loops through a sequence in reverse.",
      what: "reversed() returns an iterator that goes through a sequence from the last item to the first, without changing the original.",
      why: "Sometimes you need to process items in reverse — countdowns, undo order — without altering the data.",
      how: "Use 'for x in reversed(sequence):'. Wrap in list() if you need an actual reversed list.",
      when: "Use it to loop backwards while keeping the original order intact.",
      mistakes: ["Confusing reversed() (new iterator) with list.reverse() (changes the list).", "Forgetting to wrap in list() if you want to see or index it."],
      examples: [
        { label: "Beginner example", code: "for x in reversed([1, 2, 3]):\n    print(x)", output: "3\n2\n1" }
      ]
    },
    {
      id: "isinstance", name: "isinstance()", tag: "Built-in Function", stands: "check the type",
      blurb: "Tests whether a value is of a given type.",
      what: "isinstance(value, type) returns True if the value is of that type (or one of several types you list).",
      why: "Sometimes code must behave differently for numbers vs strings vs lists. isinstance() checks safely, including subclasses.",
      how: "Call isinstance(x, int) or isinstance(x, (int, float)) to allow several types.",
      when: "Use it to validate types or branch behavior based on a value's type.",
      mistakes: ["Using type(x) == int instead of isinstance (which also handles subclasses).", "Overusing type checks instead of designing clearer functions."],
      examples: [
        { label: "Beginner example", code: "print(isinstance(5, int))\nprint(isinstance(\"hi\", int))\nprint(isinstance(3.0, (int, float)))", output: "True\nFalse\nTrue" }
      ]
    },
    {
      id: "chr_ord", name: "chr() & ord()", tag: "Built-in Function", stands: "character ↔ number",
      blurb: "Convert between characters and their codes.",
      what: "ord() gives the numeric Unicode code of a character; chr() does the reverse, turning a number back into a character.",
      why: "Useful for ciphers, sorting by character code, or generating sequences of letters.",
      how: "Call ord(\"A\") to get 65, and chr(97) to get 'a'.",
      when: "Use them for character math — encoding, shifting letters, or building alphabets.",
      mistakes: ["Passing more than one character to ord() (it takes a single character).", "Mixing up which direction each goes."],
      examples: [
        { label: "Beginner example", code: "print(ord(\"A\"))\nprint(chr(97))", output: "65\na" }
      ]
    },

    {
      id: "custom_exceptions", name: "Custom Exceptions", tag: "Errors", stands: "your own error types",
      blurb: "Define error types meaningful to your program.",
      what: "A custom exception is your own error class (inheriting from Exception) that describes a problem specific to your program.",
      why: "Clear, named errors (TooYoungError) make code easier to read and let callers catch exactly the problem they care about.",
      how: "Define 'class MyError(Exception): pass', then raise MyError(\"message\") where the problem occurs.",
      when: "Use them when built-in errors don't clearly describe your program's specific failures.",
      mistakes: ["Forgetting to inherit from Exception.", "Creating too many error types when a built-in one would do."],
      examples: [
        { label: "Beginner example", code: "class TooYoungError(Exception):\n    pass\n\ndef register(age):\n    if age < 18:\n        raise TooYoungError(\"Must be 18+\")\n    return \"Registered\"\n\ntry:\n    register(15)\nexcept TooYoungError as e:\n    print(e)", output: "Must be 18+" }
      ]
    },
    {
      id: "error_types", name: "Common Error Types", tag: "Errors", stands: "built-in exceptions",
      blurb: "The errors beginners meet most.",
      what: "Python has built-in error types: ValueError (wrong value), TypeError (wrong type), KeyError (missing dict key), IndexError (list out of range), NameError (undefined name).",
      why: "Recognising these by name tells you instantly what went wrong and how to fix it.",
      how: "Read the error name in the traceback. Catch a specific one with except ValueError: to handle just that case.",
      when: "Knowing them helps you debug faster and catch the right exceptions.",
      mistakes: ["Catching a broad Exception when you mean a specific one.", "Ignoring the error name, which usually points straight to the cause."],
      examples: [
        { label: "Beginner example", code: "try:\n    print(int(\"abc\"))\nexcept ValueError:\n    print(\"ValueError: bad conversion\")\n\ntry:\n    print([1, 2][5])\nexcept IndexError:\n    print(\"IndexError: out of range\")", output: "ValueError: bad conversion\nIndexError: out of range" }
      ]
    },

    {
      id: "set_comprehension", name: "Set Comprehension", tag: "Advanced", stands: "build sets in one line",
      blurb: "Create a set compactly from a loop.",
      what: "A set comprehension builds a set in one line: {expression for item in sequence}, automatically dropping duplicates.",
      why: "It's a concise way to create a set of unique results from existing data.",
      how: "Write {expr for item in sequence}, optionally with an if filter — just like a list comprehension but with { }.",
      when: "Use it to build a set of unique values in a single readable line.",
      mistakes: ["Using { } with key:value by accident (that's a dict comprehension).", "Forgetting it removes duplicates automatically."],
      examples: [
        { label: "Beginner example", code: "nums = [1, 2, 2, 3, 3, 3]\nunique_squares = {n * n for n in nums}\nprint(unique_squares)", output: "{1, 4, 9}" }
      ]
    },
    {
      id: "generator_expression", name: "Generator Expressions", tag: "Advanced", stands: "lazy one-line generators",
      blurb: "Like a comprehension, but produced lazily.",
      what: "A generator expression looks like a list comprehension with parentheses: (expr for item in seq). It produces items one at a time instead of building a whole list.",
      why: "For large data or when feeding into sum()/max(), generating values on demand saves memory.",
      how: "Use ( ) instead of [ ]. Often you can drop the parentheses when passing directly to a function: sum(n*n for n in nums).",
      when: "Use it for large sequences or when you only need to iterate once (e.g. inside sum/any/all).",
      mistakes: ["Trying to index or reuse it like a list (it's one-pass).", "Using [ ] (a full list) when ( ) would save memory."],
      examples: [
        { label: "Beginner example", code: "gen = (n * n for n in range(1, 4))\nprint(sum(gen))\n\nnums = [1, 2, 3, 4]\nprint(sum(n for n in nums if n % 2 == 0))", output: "14\n6" }
      ]
    }
  ];

  /* ---------------- Rendering ---------------- */
  const grid = document.getElementById("fc-grid");
  const chipsBox = document.getElementById("fc-chips");
  const listView = document.getElementById("fc-list");
  const detailView = document.getElementById("fc-detail");
  const countEl = document.getElementById("fc-count");
  const searchInput = document.getElementById("fc-search");
  if (!grid) return;

  countEl.textContent = CONCEPTS.length + " Concepts";

  function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* ---- Smart, typo-tolerant search ---- */
  function normalize(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  }
  // Levenshtein edit distance (how many single-character edits between two words).
  function lev(a, b) {
    const m = a.length, n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    const dp = [];
    for (let j = 0; j <= n; j++) dp[j] = j;
    for (let i = 1; i <= m; i++) {
      let prev = dp[0];
      dp[0] = i;
      for (let j = 1; j <= n; j++) {
        const tmp = dp[j];
        dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1));
        prev = tmp;
      }
    }
    return dp[n];
  }
  // Relevance score: lower = better match; 9999 means "no match". Tolerates typos.
  function scoreConcept(query, c) {
    const q = normalize(query);
    if (!q) return 0;
    const nameN = normalize(c.name);
    const hay = normalize(c.name + " " + c.stands + " " + c.tag + " " + c.blurb);
    if (hay.indexOf(q) !== -1) return nameN.indexOf(q) !== -1 ? 0 : 1; // exact substring
    const tokens = q.split(" ");
    const words = hay.split(" ");
    let total = 0;
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      if (!t) continue;
      let best = Infinity;
      for (let k = 0; k < words.length; k++) {
        const w = words[k];
        if (!w || w.length < 3) continue;                                            // ignore tiny stopwords (a, in, of, to...)
        if (w.indexOf(t) !== -1) { best = Math.min(best, 0.5); continue; }          // word contains the typed text
        if (t.length >= 3 && t.indexOf(w) !== -1) { best = Math.min(best, 0.7); continue; } // typed text contains the word
        const base = Math.min(t.length, w.length);
        if (base < 3) continue;                                                       // too short to fuzzy-match safely
        const d = lev(t, w);                                                          // allow typos, scaled to word length
        const maxD = base <= 4 ? 1 : (base <= 7 ? 2 : Math.floor(base * 0.4));
        if (d <= maxD && d < base) best = Math.min(best, 1 + d);
      }
      if (best === Infinity) return 9999; // this word matched nothing -> reject
      total += best;
    }
    return 5 + total; // fuzzy matches rank below exact substring matches
  }

  // Category filter chips
  const categories = ["All"].concat(Array.from(new Set(CONCEPTS.map((c) => c.tag))));
  let activeCat = "All";

  function renderChips() {
    chipsBox.innerHTML = categories
      .map((cat) => '<button class="fc-chip' + (cat === activeCat ? " is-active" : "") +
        '" data-cat="' + escapeHtml(cat) + '">' + escapeHtml(cat) + "</button>")
      .join("");
  }

  function renderCards() {
    const q = searchInput ? searchInput.value.trim() : "";
    let list;
    if (q) {
      // Search across ALL concepts (so a category filter never hides a match), ranked by relevance.
      list = CONCEPTS
        .map((c) => ({ c: c, s: scoreConcept(q, c) }))
        .filter((x) => x.s < 9999)
        .sort((a, b) => a.s - b.s)
        .map((x) => x.c);
    } else {
      list = activeCat === "All" ? CONCEPTS : CONCEPTS.filter((c) => c.tag === activeCat);
    }
    if (list.length === 0) {
      grid.innerHTML = '<div class="fc-noresult">No concepts match “' + escapeHtml(q) +
        '”.<br>Try a simpler word like “loop”, “list”, or “function”.</div>';
      return;
    }
    grid.innerHTML = list
      .map((c) =>
        '<button class="fc-card" data-id="' + c.id + '">' +
          '<div class="fc-card-top">' +
            '<span class="fc-card-name">' + escapeHtml(c.name) + "</span>" +
            '<span class="fc-card-tag">' + escapeHtml(c.tag) + "</span>" +
          "</div>" +
          '<span class="fc-card-stands">' + escapeHtml(c.name.replace(/\(\)$/, "")) + " → " + escapeHtml(c.stands) + "</span>" +
          '<span class="fc-card-blurb">' + escapeHtml(c.blurb) + "</span>" +
          '<span class="fc-card-open">Explore →</span>' +
        "</button>")
      .join("");
  }

  function exampleHTML(ex, idx) {
    const outHTML = escapeHtml(ex.output).replace(/\n/g, "<br>");
    return (
      '<div class="fc-demo">' +
        '<div class="fc-demo-label">' + escapeHtml(ex.label) + "</div>" +
        '<div class="code-display-box">' +
          '<div class="code-display-topbar fc-codebar">' +
            '<span class="window-dot dot-red"></span>' +
            '<span class="window-dot dot-yellow"></span>' +
            '<span class="window-dot dot-green"></span>' +
            '<span class="code-filename">example.py</span>' +
            '<button class="fc-copy" type="button">Copy</button>' +
          "</div>" +
          '<pre class="python-code"><code>' + escapeHtml(ex.code) + "</code></pre>" +
          '<div class="vsc-terminal" style="display:none;">' +
            '<div class="vsc-terminal-bar"><div class="vsc-terminal-tabs">' +
              '<span class="vsc-terminal-dot vsc-dot-red"></span>' +
              '<span class="vsc-terminal-dot vsc-dot-yellow"></span>' +
              '<span class="vsc-terminal-dot vsc-dot-green"></span>' +
              '<span class="vsc-terminal-tab-label">TERMINAL</span></div>' +
              '<span class="vsc-terminal-cmd">python&nbsp;example.py</span></div>' +
            '<div class="vsc-terminal-body">' +
              '<div class="vsc-terminal-prompt-row"><span class="vsc-term-ps">PS</span>' +
                '<span class="vsc-term-path">&nbsp;C:\\AlgoPath&gt;</span>' +
                '<span class="vsc-term-cmd">&nbsp;python example.py</span></div>' +
              '<div class="vsc-terminal-output">' + outHTML + "</div>" +
              '<div class="vsc-terminal-cursor-row"><span class="vsc-term-ps">PS</span>' +
                '<span class="vsc-term-path">&nbsp;C:\\AlgoPath&gt;</span>' +
                '<span class="vsc-terminal-cursor">▋</span></div>' +
            "</div>" +
          "</div>" +
        "</div>" +
        '<button class="fc-run" type="button">▶ Run Code</button>' +
      "</div>"
    );
  }

  function renderDetail(concept) {
    const idx = CONCEPTS.indexOf(concept);
    const prev = CONCEPTS[idx - 1];
    const next = CONCEPTS[idx + 1];
    const standsName = concept.name.replace(/\(\)$/, "");

    detailView.innerHTML =
      '<button class="fc-back" id="fc-back">← All concepts</button>' +
      '<div class="fc-detail-head">' +
        '<span class="fc-detail-name">' + escapeHtml(concept.name) + "</span>" +
        '<span class="fc-detail-tag">' + escapeHtml(concept.tag) + "</span>" +
      "</div>" +
      '<p class="fc-detail-stands"><strong>' + escapeHtml(standsName) + "</strong> stands for <strong>" + escapeHtml(concept.stands) + "</strong></p>" +

      '<div class="fc-section">' +
        '<h3><span class="fc-ico">💡</span> What is it?</h3>' +
        "<p>" + escapeHtml(concept.what) + "</p>" +
        "<p><strong>Why does Python have it?</strong> " + escapeHtml(concept.why) + "</p>" +
      "</div>" +

      '<div class="fc-section">' +
        '<h3><span class="fc-ico">🛠️</span> How &amp; when to use it</h3>' +
        "<p><strong>How:</strong> " + escapeHtml(concept.how) + "</p>" +
        "<p><strong>When:</strong> " + escapeHtml(concept.when) + "</p>" +
      "</div>" +

      '<div class="fc-section">' +
        '<h3><span class="fc-ico">⚠️</span> Common beginner mistakes</h3>' +
        '<ul class="fc-mistakes">' + concept.mistakes.map((m) => "<li>" + escapeHtml(m) + "</li>").join("") + "</ul>" +
      "</div>" +

      '<div class="fc-section">' +
        '<h3><span class="fc-ico">▶️</span> Try it yourself</h3>' +
        concept.examples.map(exampleHTML).join("") +
      "</div>" +

      '<div class="fc-pager">' +
        '<button id="fc-prev"' + (prev ? "" : " disabled") + ">" +
          '<span class="fc-pg-label">← Previous</span>' +
          '<span class="fc-pg-name">' + (prev ? escapeHtml(prev.name) : "—") + "</span></button>" +
        '<button id="fc-next"' + (next ? "" : " disabled") + ">" +
          '<span class="fc-pg-label">Next →</span>' +
          '<span class="fc-pg-name">' + (next ? escapeHtml(next.name) : "—") + "</span></button>" +
      "</div>";

    listView.style.display = "none";
    detailView.classList.add("is-open");
    window.scrollTo({ top: detailView.offsetTop - 80, behavior: "smooth" });

    document.getElementById("fc-back").addEventListener("click", showList);
    if (prev) document.getElementById("fc-prev").addEventListener("click", () => renderDetail(prev));
    if (next) document.getElementById("fc-next").addEventListener("click", () => renderDetail(next));
  }

  function showList() {
    detailView.classList.remove("is-open");
    detailView.innerHTML = "";
    listView.style.display = "";
    window.scrollTo({ top: document.getElementById("concepts").offsetTop - 80, behavior: "smooth" });
  }

  /* ---------------- Events ---------------- */
  chipsBox.addEventListener("click", (e) => {
    const chip = e.target.closest(".fc-chip");
    if (!chip) return;
    activeCat = chip.dataset.cat;
    if (searchInput) searchInput.value = ""; // picking a category clears the search
    renderChips();
    renderCards();
  });

  if (searchInput) searchInput.addEventListener("input", renderCards);

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".fc-card");
    if (!card) return;
    const concept = CONCEPTS.find((c) => c.id === card.dataset.id);
    if (concept) renderDetail(concept);
  });

  // Run / Copy inside the detail showcase (event delegation)
  detailView.addEventListener("click", (e) => {
    const runBtn = e.target.closest(".fc-run");
    if (runBtn) {
      const box = runBtn.previousElementSibling; // .code-display-box
      const term = box && box.querySelector(".vsc-terminal");
      if (term) {
        term.style.display = "block";
        runBtn.textContent = "✓ Output shown";
        setTimeout(() => { runBtn.textContent = "▶ Run Again"; }, 1200);
      }
      return;
    }
    const copyBtn = e.target.closest(".fc-copy");
    if (copyBtn) {
      const codeEl = copyBtn.closest(".code-display-box").querySelector("code");
      const text = codeEl ? codeEl.textContent : "";
      const done = () => {
        copyBtn.textContent = "✓ Copied";
        copyBtn.classList.add("is-copied");
        setTimeout(() => { copyBtn.textContent = "Copy"; copyBtn.classList.remove("is-copied"); }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
      } else {
        fallbackCopy(text, done);
      }
    }
  });

  function fallbackCopy(text, done) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); done(); } catch (e) { /* ignore */ }
    ta.remove();
  }

  renderChips();
  renderCards();
})();
