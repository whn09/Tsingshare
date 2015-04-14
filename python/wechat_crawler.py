#!/usr/bin/python
#-*-coding:utf-8-*-

import pymongo # pip install pymongo==2.8
import random
import urllib
import urllib2
import json
from bson import Binary, Code
from bson import json_util
from bson.json_util import dumps
from bson.json_util import loads
from bson.objectid import ObjectId
from datetime import date, datetime

def post(url, data):
    req = urllib2.Request(url)
    data = urllib.urlencode(data)
    #enable cookie
    opener = urllib2.build_opener(urllib2.HTTPCookieProcessor())
    response = opener.open(req, data)
    return response.read()

class CJsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S');
        elif isinstance(obj, date):
            return obj.strftime('%Y-%m-%d');
        elif isinstance(obj, ObjectId):
            return json_util.default(obj);
        else:
            return json.JSONEncoder.default(self, obj);

conn = pymongo.Connection("127.0.0.1",27017)
db = conn['mean-dev'] #连接库
#db.authenticate("","") #用户认证
#db.user.drop() #删除集合user
#db.user.save({'id':1,'name':'kaka','sex':'male'}) #插入一个数据
#for id in range(2,10):
#    name = random.choice(['steve','koby','owen','tody','rony'])
#    sex = random.choice(['male','female'])
#    db.user.insert({'id':id,'name':name,'sex':sex}) #通过循环插入一组数据
content = db.articles.find()
#打印所有数据
for i in content:
    #print i
    jsonObject = json.dumps(i, cls=CJsonEncoder)
    jsonObject = json.loads(jsonObject)
    #print jsonObject
    url = jsonObject['content']
    articleid = jsonObject['_id']['$oid']
    if url.find('http://mp.weixin.qq.com') == 0:
        print url
        #print articleid
        #posturl = 'http://wirank.cn/public/api/wxnum'
        #data = {'url':url,'code':'tfjz0m'}
        posturl = 'http://wirank.cn/public/wx/getnum'
        data = {'urls':url,'code':'tfjz0m'}
        result = post(posturl, data)
        resultJson = json.loads(result)
        if resultJson['ok'] == 1:
            readnum = resultJson['data'][0]['readnum']
            likenum = resultJson['data'][0]['likenum']
            gettime = resultJson['data'][0]['gettime']
            db.wx_stats.insert({'articleid': ObjectId(articleid), 'readnum':readnum, 'likenum':likenum, 'gettime':gettime})
        else:
            print resultJson['msg']
