from django.urls import path
from django.contrib.auth.views import LogoutView
from .views import (TaskList,
                    TaskCreate,
                    TaskUpdate,
                    TaskDelete,
                    GetUser,

                    CustomLoginView,
                    RegisterPage)


urlpatterns = [
    path('tasks-list/', TaskList.as_view(), name='tasks'),
    path('task-create/', TaskCreate.as_view(), name='create'),
    path('get-user/', GetUser.as_view(), name='get-user'),
    path('task-update/<int:pk>/', TaskUpdate.as_view(), name='task-update'),
    path('task-delete/<int:pk>/', TaskDelete.as_view(), name='task-delete'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(next_page='login'), name='logout'),
    path('register/', RegisterPage.as_view(), name='register'),

]
