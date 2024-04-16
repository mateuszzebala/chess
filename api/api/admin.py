from django.contrib import admin
from api.models import ChessGame


@admin.register(ChessGame)
class ChessGameAdmin(admin.ModelAdmin):
    list_display = ('whitePlayer', 'blackPlayer', 'status')
    list_filter = ('status',)
    search_fields = ('whitePlayer', 'blackPlayer', 'gameStart')
    list_per_page = 200
    save_as = True    
