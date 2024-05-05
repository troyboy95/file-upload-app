# This project is based on React + Vite
It leverages the power of localStorage() rather than any fancy databases. The reason is simple, we're uploading text files which are way smaller in size thus, a very small portion of storage is required.

It also clears the localStorage after using the file so that it doesn't collect files as garbage.

In order to run this project:
# 1. download it from the github repo
# 2. Run the follwing commands on your terminal:
'npm install' >> 'npm run dev'

This will start a development server at http://localhost:5173/

# You can then open the App.jsx file to edit/see the code-part

The main components are located in /src folder, and here is their explanation:
# The header is a simple non-funcional navbar at the top
# The FileDisplay component renders and displays the file whenever a file upload is detetced
# Above it, we can see word count and keyword occurences, if any.