<div align="center" >
  <img src="https://github.com/SiddhantTotade/todo/blob/main/app_images/task.png" />
</div>

# About the project
Task.exe is a todo web application. With the help of this application you can assign tasks and increase your productivity by executing as musch task as you can. This application has the ability to perform various operations. This application is also has authentication system so you don't have to worry about loosing tasks. All tasks will be saved in the database. 

### Features of the project
+ Assign Task.
+ Complete Task.
+ CRUD Operations.
+ Authentication.
+ Indicator which indicates that the task is completed before time or not.
+ Search tasks.

### Technologies used
![Python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue) &nbsp; ![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green) &nbsp; ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) &nbsp; ![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white) &nbsp; ![Material UI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)

# Getting Started

## Setting Up Virtual Environment
+ Clone the project
```shell
git clone git@github.com:SiddhantTotade/task.exe.git
```
+ Open the project in the terminal. The below command opens the project in vs-code but you can choose any editor
```shell
code .
```
+ In the terminal type command to create a virtual environment. Prefer root directory for `venv`
    + The below command create a virtual environment in a specific directory
  ```shell
  python -m venv <name_of_venv>
  ```
  <div align="center">
  OR
  </div>
  &nbsp;
  
    + The below command create a virtual envvironment in the current directory
  ```shell
  python -m venv .
  ```
+ After creating `venv`, Activate it. Go to the directory in which the `venv` exists and type command
```shell
source bin/activate
```
+ Deactivate the virtual environment.
```shell
deactivate
```
+ Before installing the `requirements.txt` check if there is something exists or not. If the command shows nothing then nothing is installed yet 
```shell
pip freeze
```
+ After activating `venv`, install the `requirements.txt`.
```shell
pip install -r requirements.txt
```
## Setting Up Application
+ After enabling the `venv`, run the command for creating migrations
```shell
python manage.py makemigrations
```
+ After creating the migrations of all the models, run command
```shell
python manage.py migrate
```

## First - Running Django Server
+ Change directory to `app`
```shell
cd app
```
+ Run the django serever
```shell
python manage.py runserver
```

## Second - Running React Server
+ Now, open another terminal and change directory to todo_frontend
```shell
cd todo_frontend
```
+ Inside react directory, run command to install node modules
```shell
npm install
```
+ After installing node modules, start the react server
```shell
npm start
```

## Important Notes
+ Try to generate `app password` of gmail while to use authentication system. The authentication system requires a gmail `app password` to send a link of `forget password`.

#### Leave a star if you like the project. :star:
### Enjoy :relaxed: :relaxed:

## Project Images
<div align="center" gap="10px" display="flex">

<img src="https://github.com/SiddhantTotade/task.exe/blob/main/app_images/app_image_1.png" width="400px" />
<img src="https://github.com/SiddhantTotade/task.exe/blob/main/app_images/app_image_2.png" width="400px" />
<img src="https://github.com/SiddhantTotade/task.exe/blob/main/app_images/app_image_3.png" width="400px" />
<img src="https://github.com/SiddhantTotade/task.exe/blob/main/app_images/app_image_4.png" width="400px" />

<div/>
