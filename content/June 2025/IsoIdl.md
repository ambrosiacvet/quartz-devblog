---
title: IsoIdl
date: 2025-06-30
draft: "false"
tags:
  - IsoIdl
  - GridBasedMovement
  - Pathfinding
  - ISM
  - HexagonalGrid
  - TurnBasedStrategy
  - UE5
  - Plugin
  - Game
---

| Info                |                                                        |
| ------------------- | ------------------------------------------------------ |
| **Project Title**   | <span style="font-variant:small-caps;">*IsoIdl*</span> |
| **Project Type**    | *Plugin, Game*                                         |
| **Engine**          | *UE 5.5.4*                                             |
| **Version Control** | *none*                                                 |
| **Repository**      | *N/A*                                                  |
> [!info]
> <span style="font-variant:small-caps;">*IsoIdl*</span> is a turn-based strategy game made in UE5 using Blueprints. The grid-based elements (movement, tile generation, pathfinding, etc.) will eventually be made into a Plugin to release on Fab.

<span style="font-variant:small-caps;">*IsoIdl*</span> started as a game jam idea. Well—sort of. The truth is that I'd been wanting to make a turn-based strategy RPG for years but kept getting stuck on where to begin. RPGs are *a lot* to develop—especially if, like me, you have a tendency to really get into the weeds with characters and narrative structure.

So when a fellow SNHU alum started a game jam (theme: **Shape Science!!!**), I took it as my opportunity to finally start making progress. An sRPG is too complex? Better strip it down to the foundation, then: grid-based movement and pathfinding in a simpler project.

Despite a crazy confluence of events—raging allergies, a surprise job interview, and an office-melting heat wave—preventing me from finishing a playable game for the jam, I still made meaningful progress:

- Spawned a hex grid using an [[Instanced Static Mesh]]
- Controlled the individual tile colors with [[Custom Data Values]]
- Implemented a working [[A* Pathfinding]] algorithm

Before I go any further, my first challenge is to do it all again, but in C++ this time. This is crucial to the well-being of both my mental health and the project. I simply *cannot* maintain a pathfinding system written entirely in Blueprints. And, since I want to use this system in the future after finishing <span style="font-variant:small-caps;">*IsoIdl*</span>, on a project that will definitely be using C++, it will be much easier to write it as a C++ UE Plugin.
## Roadmap
> [!abstract]+ Port What I've Already Done To C++
>- [x] Create Plugin
>- [ ] Transfer `BP_Grid`
>- [ ] Transfer `BP_Pathfinding` (this should be made into an Actor component)

>[!abstract]+ Finish <span style="font-variant:small-caps;">*IsoIdl*</span>
> - [ ] Create pawns (should have a basic attribute set)
> - [ ] Spawn pawns according to grid
> - [ ] Grid-based movement
> - [ ] Create Actions and UI (move, attack, etc.)
> - [ ] Implement XP and level up system
> - [ ] Create formation system (shape science, baby!)
> - [ ] Define turn-based structure
> - [ ] Make main menu

### Timeline
```mermaid
gantt
    dateFormat  MM-DD-YYYY
    axisFormat  %d %b
    tickInterval 2week

    section The Jam
	Materials for Grid Tiles       :done,     mats,         06-13-2025, 2d
	ISM Grid                       :done,     grid,         after mats, 2d
	Interactable Tiles             :done,     interact,     after grid, 3d
	A* Pathfinding                 :done,     path,         after interact, 3d
	Office-melting Heatwave        :crit, done, heat,       after path, 5d

    section The Plugin
    Setup VC                       :done,     vc,           07-05-2025, 1d
    Create Plugin                  :done,     plugin,       after vc, 1d
    Refactor Grid for C++          :crit, active, refact,       after plugin, 14d
	Develop BP Utilities           :          util,         after refact, 10d
	Prepare for Release            :          prep,         after util, 4d
	Research Fab Release           :active,   research,     07-05-2025, until releasep
	Release Plugin                 :milestone,releasep,     after prep, 1d

	section Finish IsoIdl
	Create Pawns                   :          pawn,         07-17-2025, until util
	Spawning and Movement          :          move,         after pawn, 5d
	Action/UI                      :          ui,           after move, 5d
	XP/Formation                   :          xp,           after releasep, 4d
	Game Loop                      :          loop,         after xp, 10d
	Main Menu                      :          menu,         after loop, 5d
	Build for Itch.io              :          build,        after menu, 2d
	Post on Itch                   :milestone,releasei,     after build, 1d
	Writeup on Portfolio           :milestone,port,         after releasei, 1d
```