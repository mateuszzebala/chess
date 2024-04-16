from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User
import random
from .utils import Chess

def successResponse(success):
    return JsonResponse({
        'success': success
    })

def status(code=200, message=''):
    response = JsonResponse({'message': message})
    response.status_code = code
    return response

def signin(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    
    user = authenticate(username=username, password=password)
    
    if user is not None:
        login(request, user)
        return successResponse(True)
        
    return successResponse(False)

def signup(request):
    username = request.POST.get('username')
    email = request.POST.get('email')
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')
    password1 = request.POST.get('password1')
    password2 = request.POST.get('password2')
    
    if User.objects.filter(username=username).exists():
        return JsonResponse({
            'error': 'Username is taken!'
        })
        
    if User.objects.filter(email=email).exists():
        return JsonResponse({
            'error': 'E-mail address is taken!'
        })
        
    if password1 != password2:
        return JsonResponse({
            'error': 'Passwords are different!'
        })
    
    user = User(username=username, email=email, first_name=first_name, last_name=last_name)
    user.set_password(password1)
    user.save()
    login(request, user)
    return successResponse('Account created!')
    

def signout(request):
    logout(request)
    return JsonResponse({})
    

def get_account_info(request):
    if request.user.is_authenticated:
        return JsonResponse({
            'username': request.user.username,
            'email': request.user.email,
            'first_name': request.user.first_name,
            'last_name': request.user.last_name,
            'is_logged_in': True,
            'session_key': request.session.session_key,
        })
    else:
        return JsonResponse({
            'is_logged_in': False,
            'is_logged_in': request.session.session_key,
        })
    
def change_account_info(request):
    if request.user.is_authenticated:
        username = request.POST.get('username')
        email = request.POST.get('email')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        
        if request.user.username != username:
            if User.objects.filter(username=username).exists(): 
                return JsonResponse({'error': 'Username is taken!'})
        if request.user.email != email:
            if User.objects.filter(email=email).exists(): 
                return JsonResponse({'error': 'E-mail address is taken!'})
            
        request.user.username = username
        request.user.email = email
        request.user.first_name = first_name
        request.user.last_name = last_name
        request.user.save()
        
        return status(200, 'Data changed!')
        
    else:
        return status(403, 'You are not logged in!')

def change_account_password(request):
    if request.user.is_authenticated:
        old_password = request.POST.get('old_password')
        new_password1 = request.POST.get('new_password1')
        new_password2 = request.POST.get('new_password2')
        user = authenticate(username=request.user.username, password=old_password)
        if user is None: return JsonResponse({'error': 'Old password is wrong!'})
        if new_password1 != new_password2: return JsonResponse({'error': 'New password are different!'})
        user.set_password(new_password1)
        user.save()
        return status(200, 'Password changed!')
    else:
        return status(403, 'You are not logged in!')


def get_free_games(request):
    games = Chess.Game.get_free_games()
    
    return JsonResponse({
        'games': [
            {'id': game.id, 'player': game.players[0].username, 'time': game.time, 'color': game.color} for game in games
        ]
    })

def create_new_game(request):
    time = int(request.POST.get('time'))
    color = request.POST.get('color')
    
    game = Chess.Game(time, color, request.user)
    
    return JsonResponse({
        'gameId': game.id
    })


def cancel_new_game(request):
    id = request.POST.get('id')
    Chess.Game.cancel_game(id)
    return JsonResponse({})

def get_game_status(request):
    gameId = request.POST.get('id')
    game = Chess.Game.get_game_by_id(gameId)
    
    if game is None:
        return JsonResponse({
            'gameId': None,
            'you_in_game': False
        })
    
    you_in_game = any(user.id == request.user.id for user in game.players)
    
    return JsonResponse({
        'gameId': gameId,
        'players': len(game.players),
        'you_in_game': you_in_game
    })
    
def join_to_game(request):
    gameId = request.POST.get('id')
    game = Chess.Game.get_game_by_id(gameId)
    
    if game is None:
        return JsonResponse({
            'gameId': None,
            'you_in_game': False
        })
    
    you_in_game = any([user.id == request.user.id for user in game.players])
    
    if not you_in_game and len(game.players) < 2: 
        game.add_player(request.user)
        
    you_in_game = any([user.id == request.user.id for user in game.players])
    
    return JsonResponse({
        'gameId': game.id,
        'you_in_game': you_in_game
    })
    

def get_game_parameters(request):
    gameId = request.POST.get('id')
    game = Chess.Game.get_game_by_id(gameId)
    
    if game is None:
        return JsonResponse({'error': 'Game does not exists!'})
    
    if len(game.players) < 2:
        return JsonResponse({'error': 'Game not started!'})
    
    if game.white.id != request.user.id and game.black.id != request.user.id:
        return JsonResponse({'error': 'You are not in game!'})
    
    color = 'white' if request.user.id == game.white.id else 'black'
    time = game.whiteTime if request.user.id == game.white.id else game.blackTime
        
    return JsonResponse({
        'your_color': color,
        'your_time': time,
        'white': {
            'username': game.white.username,
            'time': game.whiteTime,
        },
        'black': {
            'username': game.black.username,
            'time': game.blackTime,
        },
        'moves': game.moves
    })
    
    
    
