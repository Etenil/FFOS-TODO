// This isn't a mozilla browser. You should come to the bright side.
if(!navigator.mozApps) {
    $('.install').hide();
} else {
    var request = navigator.mozApps.getInstalled();
    request.onsuccess = function() { // Already intalled.
        if(request.result.length > 0) {
            $('.install').hide();
        } else {
            $('.install').click(function(e) {
                var url = location.href.substring(0, location.href.lastIndexOf("/"));
                url+= "/manifest.webapp"
                var installreq = navigator.mozApps.install(url);
                installreq.onsuccess = function() {
                    $('.install').hide();
                };
                installreq.onerror = function() {
                    alert("Couldn't install application. " + this.error.name);
                }
            });
        }
    };
}


