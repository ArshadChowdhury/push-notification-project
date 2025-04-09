# 🚀 Push Notification Project (NestJS + Redis + Bull)

A simple NestJS-based backend service for sending **push notifications immediately** or **scheduling them for later**.

---

## ✅ Features

- Send push notifications instantly to all users.
- Schedule notifications using Redis-powered queues (Bull).
- Accepts `scheduleAt` in ISO 8601 format.
- Input validation with `class-validator`.
- Simulated user table with mock data.
- Optional: Integrate FCM for real push delivery.

---

## 📦 Tech Stack

- [NestJS](https://nestjs.com/)
- [Bull](https://github.com/OptimalBits/bull) for job scheduling
- [Redis](https://redis.io/)
- [class-validator](https://github.com/typestack/class-validator)
- [Firebase Admin SDK (optional)](https://firebase.google.com/docs/admin/setup)

---

## 🛠️ Installation

### 1. Clone the repo

```bash
git clone https://github.com/ArshadChowdhury/push-notification-project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start Redis

```bash
sudo service redis-server start
```

### 4. Running the project locally

```bash
npm run start:dev
```

### 5. Testing API Endpoints

We can test API endpoints using Postman or Insomnia.

Endpoints :




```bash
# http://localhost:3000/push/send-now

dummy json body : 
{
  "title": "Urgent Update",
  "message": "Please update your app!"
}

```


```bash
# http://localhost:3000/push/schedule

dummy json body : 
{
  "title": "Promo Alert",
  "message": "Get 20% OFF!",
  "scheduleAt": "2025-04-09T15:08:00.000Z"
}

```

## Scheduling Logic Breakdown

We want to send a push notification at a future date/time specified in the request payload. 

```
const delay = new Date(dto.scheduleAt).getTime() - Date.now();
```

Here dto.scheduleAt is the time the user wants the notification to be sent (in ISO 8601 format — always in UTC).

Date.now() is the current server time in milliseconds.

so delay is now holding the value of how many milliseconds into the future the job should be executed.

Redis holds the job in a delayed state (push-queue) until the timer expires.

Once the delay is over (i.e., at the scheduled time), Bull processes the job and the notification is sent to all users or gets logged in our case.



