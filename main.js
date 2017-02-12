let timers = [];
let max_timeout = 5000;


setInterval(function() 
{
    jcmp.players.forEach(function(player) 
    {
        if (player.ready == true)
        {
            jcmp.events.CallRemote('Ping', player);
            if (timers[player.networkId] == null)
            {
                timers[player.networkId] = setTimeout(function() 
                {
                    if (jcmp.players.filter(p => p.networkId == player.networkId).length > 0)
                    {
                        player.Kick("Connection timed out");
                        console.log(`${player.realname}'s connection timed out.`);
                    }
                    delete timers[player.networkId];
                }, max_timeout);
            }
        }
    });
}, 3000);

jcmp.events.AddRemoteCallable('Pong', (player) => {
    if (timers[player.networkId] != null)
    {
        clearTimeout(timers[player.networkId]);
        delete timers[player.networkId];
    }
})