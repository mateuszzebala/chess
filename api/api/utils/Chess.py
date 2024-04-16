
import chess
import random
from uuid import uuid4
import json

class Game:
    games = []
    
    def __init__(self, time, color, user) -> None:
        self.board = chess.Board()
        self.moves = []
        self.time = time
        self.color = color
        self.players = [user]
        self.id = uuid4().hex
        self.blackTime = time
        self.whiteTime = time
        self.white = None
        self.black = None
        self.whiteConsumer = None
        self.blackConsumer = None
        Game.games.append(self)
        
    def is_move_of_white(self) -> bool:
        return self.board.turn == chess.WHITE
    
    def is_move_of_black(self) -> bool:
        return self.board.turn == chess.BLACK
        
    def move(self, move, player_color):
        
        try:
            self.board.push(self.board.parse_san(move))
            if player_color == 'white' and self.blackConsumer is not None:
                self.blackConsumer.send(json.dumps({
                    'moveAlgebraic': move
                }))
            
            if player_color == 'black' and self.whiteConsumer is not None:
                self.whiteConsumer.send(json.dumps({
                    'moveAlgebraic': move
                }))
            self.moves.append(move)
            
        except chess.IllegalMoveError:
            ...
        
       
    def add_player(self, user):
        self.players.append(user)
        if self.color == 'white':
            self.white = self.players[0]
            self.black = self.players[1]
        else:
            if self.color == 'random':
                random.shuffle(self.players)
            self.black = self.players[0]
            self.white = self.players[1]
    
    @staticmethod
    def get_free_games():
        return [game for game in Game.games if len(game.players) == 1]
    
    @staticmethod
    def cancel_game(id):
        Game.games = [game for game in Game.games if game.id != id]

    @staticmethod   
    def get_game_by_id(id):
        for game in Game.games:
            if game.id == id:
                return game
        return None
    
    def get_my_game(userId):
        for game in Game.games:
            if game.white is None or game.black is None: continue
            if game.white.id == userId or game.black.id == userId:
                return game
        return None
    
