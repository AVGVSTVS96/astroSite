---
title: 'Breaking into a local Windows account without a password'
description: "Local Windows password are hilariously easy to reset. Here's how to reset a Windows password using a standard Windows installation USB."
pubDate: 2024-04-28
author: 'Bassim Shahidy'
tags: ['Windows', 'Password', 'Reset', Hack]
---

To reset a windows password without knowing the password or logging in, you will need to boot into advanced options to access a command prompt.

1. Boot into Advanced Options
    - From login screen hold `Shift` and click `Restart`
    - From Windows Recovery Environment, select `Troubleshoot`
2. Open Command Prompt
    - cd to `C:`
    - cd to `windows\system32`
3. Run `ren utilman.exe utilman1.exe`, disregard any errors
4. Run `ren cmd.exe utilman.exe`
5. Exit CMD, continue to Windows
6. At login screen, click accessibility button next to power button, this will open CMD
7. Run `net user` to list users
8.  Reset password with `net user [username] *`

Or

Password can also be reset through User Accounts GUI

6. Run `control userpasswords2`

