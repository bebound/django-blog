from django.contrib import admin
from web.models import Post, Tag, Category
from bs4 import BeautifulSoup
import html.parser


class PostAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['title']}),
        ('Date information', {'fields': ['status', 'category', 'tag']}),
        ('Count',
         {'fields': ['viewCount', 'commentCount', 'dayCount', 'weekCount', 'monthCount'], 'classes': ['collapse']}),
        #('Time', {'fields': ['createTime', 'lastModified', 'lastCountModified'], 'classes': ['collapse']}),
        (None, {'fields': ['body', ]}),
        ('autoFill', {'fields': ['alias', 'description', 'excerpt'], 'classes': ['collapse']}),
    ]

    list_display = ['title', 'author', 'status', 'category', 'createTime']
    list_filter = ['createTime']
    search_fields = ['title']
    date_hierarchy = 'createTime'

    def save_model(self, request, obj, form, change):
        obj.author = request.user
        #obj.body=html.parser.HTMLParser().unescape(obj.body)
        obj.excerpt = BeautifulSoup(obj.body).get_text().strip()[:120]
        obj.save()


class TagAdmin(admin.ModelAdmin):
    list_display = ('tag',)


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('category',)


admin.site.register(Post, PostAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Category, CategoryAdmin)
