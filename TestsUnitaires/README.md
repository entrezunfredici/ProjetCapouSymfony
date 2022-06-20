# Capou Python Helpers

## Introduction
I have written these helpers to help my colleagues and myself to work on the Capou Project

## Gateway Emulator
This one is pretty self explanatory, it reproduces the ESP Lora Gateway's behaviour when it comes to HTTP GETs and POSTs, but sends bogus data with the node ID 0xAA

## Helper Website
This Flask app reproduces the web server's behaviour, it can handle POST requests and gives the Valve state through GET methods. It also stores all the requests sorted by date and time in a folder it creates at the script's level called `RequestsLog`

