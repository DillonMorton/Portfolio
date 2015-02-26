// Warn about globals.
/*jshint undef: true, browser: true, jquery: true */
/*global Raven*/
function logSender(logUrl, logLevel, ticketId) {
    this.refreshTime = 2*60*1000;
    this.level = logLevel;
    this.logQue = [];
    this.logUrl = logUrl;
    this.ticket = ticketId;
    this.sessionId = Math.floor(Math.random() * 1000000000);

    this.startSending = function(refreshTime) {
        if (typeof refreshTime !== 'undefined') {
            this.refreshTime = refreshTime;
        }
        var that = this;
        setTimeout(function() { that._logRefresh(); }, this.refreshTime);
    };

    this._sendLog = function() {
        var data = {
            events : this.logQue
        };

        data.session = this.sessionId;
        data.ticket = this.ticket;

        $.ajax({
            type: "POST",
            url: this.logUrl,
            data: JSON.stringify(data),
            error: function() {},
            success: function() {}
        });
        this.logQue.length = 0;
    };

    this._logRefresh = function() {
        if (this.logQue.length > 0) {
            this._sendLog();
        }
        var that = this;
        setTimeout(function() { that._logRefresh(); }, this.refreshTime);
    };

    this._levelValue = function(level) {
        if (level == "ERROR") return 40;
        if (level == "WARNING") return 30;
        if (level == "INFO") return 20;
        if (level == "DEBUG") return 10;
        return 0;
    };

    this.filter = function(log_level) {
        var act_value = this._levelValue(this.level);
        var value = this._levelValue(log_level);
        if (value >= act_value)
            return true;
        else
            return false;
    };

    this.log = function(log_level, type, msg, exception) {
        if (this.filter(log_level)) {
            this.logQue.push({level: this._levelValue(log_level),
                              type: type,
                              msg: msg,
                              exception: this._dumpException(exception),
                              date : new Date()});
        }
    };

    this.flush = function() {
        if (this.logQue.length > 0) {
            this._sendLog();
        }
    };

    this._dumpException = function(exception) {
        // TODO: improve
        if (exception) {
            try {
                return exception.toString();
            } catch(err) {
                return null;
            }
        }
        return null;
    };
}

function ravenLogSender() {
    this.log = function(level, type, msg, exception) {
        if (level != "ERROR")
            return;

        var options = {
            tags: {
                level: level.toLowerCase(),
                type: type,
                message: msg
            },
            // Differentiate the manually-sent messages from exceptions
            // automatically logged by Raven.
            logger: 'codility-javascript'
        };

        if (exception) {
            Raven.captureException(exception, options);
        } else {
            Raven.captureMessage(type, options);
        }
    };
}

var Log = {
    handlers : [],

    addHandler : function(handler) {
        for (var i = 0; i < this.handlers.length; i++) {
            if (this.handlers[i] === handler) return;
        }
        this.handlers.push(handler);
    },

    flush: function() {
        for (var i = 0; i < this.handlers.length; i++) {
            if (typeof this.handlers[i].flush == 'function') {
                this.handlers[i].flush();
            }
        }
    },

    handle : function(level, type, msg, exception) {
        for (var i = 0; i < this.handlers.length; i++) {
            this.handlers[i].log(level, type, msg, exception);
        }
    },

    debug : function(type, msg, exception) {
        this.handle("DEBUG", type, msg, exception);
    },

    info : function(type, msg, exception) {
        this.handle("INFO", type, msg, exception);
    },

    warning : function(type, msg, exception) {
        this.handle("WARNING", type, msg, exception);
    },

    error : function(type, msg, exception) {
        this.handle("ERROR", type, msg, exception);
        this.flush();
    }
};

function initializeLoggers(log_url, log_level, ticket_id, use_raven_js) {
    var sender = new logSender(log_url, log_level, ticket_id);
    Log.addHandler(sender);
    // Log.addHandler(console);
    if (use_raven_js)
        Log.addHandler(new ravenLogSender());
    sender.startSending();
}
