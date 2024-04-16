from django.db import models
from django.contrib.auth.models import User

GAME_SATUSES = (
    ('waiting', 'Waiting for start'),
    ('playing', 'During play'),
    ('ended', 'Game ended')
)

class ChessGame(models.Model):
    whitePlayer = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='whitePlayer')
    blackPlayer = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='blackPlayer')
    gameStart = models.DateTimeField(auto_now_add=True)
    status = models.CharField(choices=GAME_SATUSES, max_length=8)
    winner = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='winner')
    whiteTime = models.IntegerField()
    blackTime = models.IntegerField()
    whitesMove = models.BooleanField(default=True)
    
    def __str__(self) -> str:
        return f'<ChessGame {self.whitePlayer} - {self.blackPlayer}>'
    
    def __repr__(self) -> str:
        return str(self)
    
    def endGame(self):
        self.status = 'ended'
        self.save()
    
    def isGameEnded(self):
        return self.status == 'ended'
    
    def switchMover(self):
        self.whitesMove = not self.whitesMove
        self.save()
        
    def blackWins(self):
        self.winner = self.blackPlayer
        self.save()
        self.endGame()
    
    def whiteWins(self):
        self.winner = self.whitePlayer
        self.save()
        self.endGame()
    
    
    
    
        
        
        