from channels.generic.websocket import WebsocketConsumer
from .utils import Chess
import json
from django.contrib.sessions.models import Session
from django.contrib.auth.models import User

class ChessConsumer(WebsocketConsumer):
    def connect(self):
        self.authenticated = False
        self.user = None
        self.accept()
        self.game = None
        self.my_color = None
        self.color = None
        self.user = self.scope["user"]
        self.game = None
        
    def disconnect(self, exit_code):
        print(f'Websocket disconncted with exit code {exit_code}')
        self.close()
        
    def receive(self, text_data):
        data = json.loads(text_data)
        
        self.game = Chess.Game.get_game_by_id(data.get('gameId'))
        
        if self.game is None:
            self.disconnect(400)
        
        if self.game.white.id == self.user.id:
            self.game.whiteConsumer = self
        elif self.game.black.id == self.user.id:
            self.game.blackConsumer = self
        
        if data.get('option') == 'move':

            if self.game.white.id == self.user.id:
                if self.game.is_move_of_white():
                    self.game.move(data.get('moveAlgebraic'), 'white')
                    
            if self.game.black.id == self.user.id:
                if self.game.is_move_of_black():
                    self.game.move(data.get('moveAlgebraic'), 'black')
