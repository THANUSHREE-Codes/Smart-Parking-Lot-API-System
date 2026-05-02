# 🚗 Smart Parking Lot API System

A RESTful backend API built with **Node.js**, **Express**, and **MongoDB** that centralizes parking lot management — tracking vehicle entry/exit, monitoring real-time slot availability, and maintaining complete parking session history.

> Built to solve the inefficiency of manual parking logs in urban environments like malls, hospitals, offices, and railway stations.

---

## 📌 Problem Statement

Urban parking facilities still rely on manual logs and disconnected tools, making it difficult to:
- Track vehicle entry and exit in real time
- Monitor slot availability across zones
- Maintain accurate and searchable parking history

This system provides a **centralized backend solution** that automates slot allocation, tracks occupancy, and maintains consistent parking records — eliminating human error and reducing congestion.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB (via Mongoose ODM) |
| Environment | dotenv |
| Dev Server | Nodemon |

---

## 📁 Project Structure

```
Smart-Parking-Lot-API-System/
├── models/          # Mongoose schema definitions
├── routes/          # Express route handlers
├── server.js        # Entry point — Express app setup & DB connection
├── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 
- MongoDB 

## 🔌 API Endpoints

### Parking Lots

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/lots` | Create a new parking lot |
| `GET` | `/api/lots` | Get all parking lots |
| `GET` | `/api/lots/:id` | Get a specific lot |
| `GET` | `/api/lots/:id/availability` | Get real-time slot availability |

### Sessions (Entry / Exit)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/sessions/entry` | Register vehicle entry & auto-assign slot |
| `POST` | `/api/sessions/exit` | Register vehicle exit & calculate bill |
| `GET` | `/api/sessions/active` | Get all currently parked vehicles |
| `GET` | `/api/sessions/history` | Get full parking history (filter by vehicle/date) |

---

## 🌍 SDG Alignment & Social Impact

This project maps to the following **UN Sustainable Development Goals**:

- **SDG 11 — Sustainable Cities and Communities**: Improves urban infrastructure through smarter parking management, reducing traffic congestion at entry/exit points.
- **SDG 13 — Climate Action**: Less time spent searching for parking = less fuel burned = lower carbon emissions.
- **SDG 9 — Industry, Innovation and Infrastructure**: Digitizes manual systems in public facilities like hospitals, stations, and government offices.

---

## 🚀 Future Enhancements

- [ ] ANPR (Automatic Number Plate Recognition) integration
- [ ] Real-time slot updates via Socket.io
- [ ] React-based operator dashboard
- [ ] SMS/email notifications on entry and exit (Twilio / Nodemailer)
- [ ] Analytics: revenue reports, peak-hour heatmaps, slot utilization

---
Thank you for checking out Smart Parking Lot API System!😊
Every bit of feedback helps this project grow. 🙌
