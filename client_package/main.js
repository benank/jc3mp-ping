jcmp.events.AddRemoteCallable('Ping', () => {
    jcmp.events.CallRemote('Pong');
})