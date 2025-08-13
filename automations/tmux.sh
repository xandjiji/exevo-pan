#!/bin/bash

#!/bin/bash

SESSION_NAME="tmux_fefaserver"

if tmux has-session -t $SESSION_NAME 2>/dev/null; then
    tmux attach-session -t $SESSION_NAME
else
    tmux new-session -d -s $SESSION_NAME -n "fefaserver"

    tmux split-window -h
    tmux split-window -v
    tmux split-window -v

    tmux select-pane -t 0
    tmux split-window -v


    tmux send-keys -t 0 'pm2 logs --raw ScrapAuctions' C-m
    tmux send-keys -t 1 'pm2 logs --raw HistoryServer' C-m
    tmux send-keys -t 2 'pm2 logs --raw ScrapHistory' C-m
    tmux send-keys -t 3 'pm2 logs --raw ScrapBosses' C-m
    tmux send-keys -t 4 'htop' C-m

    tmux select-pane -t 4


    tmux attach-session -t $SESSION_NAME
fi

