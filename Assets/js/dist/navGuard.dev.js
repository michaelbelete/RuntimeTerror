"use strict";

var userId = sessionStorage.getItem("userId");

if (userId === null || userId === undefined) {
  location.href = "index.html";
}