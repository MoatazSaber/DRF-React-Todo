# DRF-React-Todo
To Do App made with Django Rest Framework and ReactJs

##### Inside this repository
You will find a Django project named `todo_list` with an app named `base`
You will also find the frontend part of the project in a folder named `frontend`

# Installing
*First* open a new terminal at the root of the project and install all needed dependencies for the backend from the `requirements.txt` file by running
```
pip install -r requirements.txt
```

*Second* navigate to the `frontend` directory and install all needed dependencies by running
```
npm i
``` 
# Instructions
To run the project locally, navigate to the project's root directory and run
```
python manage.py runserver
```
The app should be now online and hosted on 
#### [PORT 8000](http://127.0.0.1:8000/)
The Admin Panel is available on
#### [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin/)

# Create a Super User by running 
```
python manage.py createsuperuser
```
### Or use the already defined super user
```
username: admin
password: testpassword
```

# To upload to do items list from an external.txt file make sure that the file is in the following syntax
```
[ ] Item One
[x] Item Two
```
## If any changes/updates are made to the `frontend` project, please use the following command to commit these changes to the project
```
npm run build
```

###### Note that:
-Login is required to view a user's tasks.\
-A user can only view/edit his/her own tasks.
