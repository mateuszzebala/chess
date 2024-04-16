from django.urls import path
from . import views

urlpatterns = [
    path('account/signin/', views.signin, name='signin'),
    path('account/signout/', views.signout, name='signout'),
    path('account/signup/', views.signup, name='signup'),
    path('account/info/', views.get_account_info, name='get_account_info'),
    path('account/change/', views.change_account_info, name='change_account_info'),
    path('account/password/', views.change_account_password, name='change_account_password'),
    
    path('game/free/', views.get_free_games, name='get_free_games'),
    path('game/new/', views.create_new_game, name='create_new_game'),
    path('game/cancel/', views.cancel_new_game, name='cancel_new_game'),
    path('game/join/', views.join_to_game, name='join_to_game'),
    path('game/status/', views.get_game_status, name='get_game_status'),
    path('game/params/', views.get_game_parameters, name='get_game_parameters'),
    
]
