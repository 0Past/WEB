from aiohttp import web
from datetime import date

routes = web.RouteTableDef()
@routes.get('/hello')
async def hello(req):
    return web.Response(text=f"Hello, homies")

@routes.post('/main')
async def main(req):
    grade = 0
    lifeGrade = 0
    ageGrade = 0
    data = await req.json()
    print(data)

    if data['gender'] == 'female':
        grade += 0.4

    bd = data['birthDate'].split('-')
    age = int(date.today().year) - int(bd[0])
    if (int(date.today().month) < int(bd[1])):
        age -= 1
    if (age >= 20):
        ageGrade = age * 0.1
        if (ageGrade < 0.3):
            grade += ageGrade
        else:
            grade += 0.3

    lifeGrade = lifeGrade + int(data['periofLife']) * 0.042
    if lifeGrade > 0.42:
        grade = grade + 0.42
    else:
        grade = grade + lifeGrade

    grade = grade + int(data['periodWork']) * 0.059

    if data['sphere'] == 'public':
        grade = grade + 0.21

    if data['profession'] == 'developer' or data['profession'] == 'teacher' \
            or data['profession'] == 'judge' or data['profession'] == 'pilot':
        grade = grade + 0.55
    elif data['profession'] == 'other':
        grade = grade + 0.19

    if ('bankAccount' in data) and (data['bankAccount'] == 'on'):
        grade = grade + 0.45

    if ('realEstate' in data) and (data['realEstate'] == 'on'):
        grade = grade + 0.35

    if ('insurencePolice' in data) and (data['insurencePolice'] == 'on'):
        grade = grade + 0.19

    print(grade)
    return web.Response(text=f'{grade}')

app = web.Application()
app.add_routes(routes)
web.run_app(app, port=8081)