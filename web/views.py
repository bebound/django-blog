from django.http import HttpResponse, Http404
from django.shortcuts import render, get_object_or_404
from web.models import Post, Category, Tag
import math


def index(request, page=1):
    allPostList = Post.objects.order_by('-createTime').all()
    context = indexPageCommon(allPostList, int(page))
    if not context:
        raise Http404
    else:
        return render(request, 'web/index.html', context)

        # postList = Post.objects.order_by('-createTime')[(int(page) - 1) * 10:int(page) * 10]
        # if len(postList) == 0:
        #     raise Http404
        # else:
        #     prevPage = -1
        #     nextPage = -1
        #     if page > 1:
        #         prevPage = page - 1
        #     try:
        #         temp = Post.objects.order_by('-createTime')[int(page) * 10 + 1]
        #         if temp:
        #             nextPage = page + 1
        #     except:
        #         pass
        #
        #     context = {}
        #     context.update(globalContent)
        #     context['postList'] = postList
        #     context['nextPage'] = nextPage
        #     context['prevPage'] = prevPage
        #     context['curPage'] = page
        #     return render(request, 'web/index.html', context)


def detailView(request, postID):
    post = get_object_or_404(Post, pk=postID)
    context = {}
    context['headTitle'] = 'KK Blog'
    context['h2Title'] = "KK's blog"
    context['categoryList'] = Category.objects.order_by('category')
    context['tagList'] = Tag.objects.all()
    context['newestPost'] = Post.objects.order_by('-createTime')[:10]

    context['post'] = post
    return render(request, 'web/detail.html', context)


def categoryView(request, categoryName, page=1):
    allPostList = Post.objects.filter(category__category=categoryName).all()
    context = indexPageCommon(allPostList, page)
    if not context:
        raise Http404
    else:
        return render(request, 'web/index.html', context)


def tagView(request, tagName, page=1):
    allPostList = Post.objects.filter(tag__tag=tagName).all()
    context = indexPageCommon(allPostList, page)
    if not context:
        raise Http404
    else:
        return render(request, 'web/index.html', context)


def timeView(request, year, month, page=1):
    allPostList = Post.objects.filter(createTime__year=str(year), createTime__month=str(month)).all()
    context = indexPageCommon(allPostList, page)
    if not context:
        raise Http404
    else:
        return render(request, 'web/index.html', context)


def authorView(request, authorName, page=1):
    allPostList = Post.objects.filter(author__username=authorName).all()
    context = indexPageCommon(allPostList, page)
    if not context:
        raise Http404
    else:
        return render(request, 'web/index.html', context)


def indexPageCommon(allPostList, page):
    temp = {}
    temp['headTitle'] = 'KK Blog'
    temp['h2Title'] = "KK's blog"
    temp['categoryList'] = Category.objects.order_by('sort')
    temp['tagList'] = Tag.objects.all()
    temp['newestPost'] = Post.objects.order_by('-createTime')[:10]
    totalPage = math.ceil(len(allPostList) / 10)
    postList = allPostList[(int(page) - 1) * 10:int(page) * 10]
    if not postList:
        return False
    else:

        prevPage = -1
        nextPage = -1
        if page > 1:
            prevPage = page - 1
        try:
            temp2 = allPostList[int(page) * 10]
            if temp2:
                nextPage = page + 1
        except:
            pass
        temp['allPostList'] = allPostList
        temp['totalPage'] = totalPage
        temp['postList'] = postList
        temp['nextPage'] = nextPage
        temp['prevPage'] = prevPage
        temp['curPage'] = page

        if totalPage < 11:
            temp['pages'] = range(1, totalPage + 1)
        else:
            if page <= 5:
                temp['pages'] = range(1, 10)
                temp['pages'].append('...')
                temp['pages'].append(totalPage)
            elif 5 < page < totalPage - 4:
                temp['pages'] = []
                temp['pages'].append(1)
                temp['pages'].append('...')
                temp['pages'].extend(range(page - 4, range + 4))
                temp['pages'].append('...')
                temp['pages'].append(totalPage)
            else:
                temp['pages'] = []
                temp['pages'].append(1)
                temp['pages'].append('...')
                temp['pages'].extend(range(totalPage - 8, totalPage + 1))
        return temp
