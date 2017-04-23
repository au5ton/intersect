window.x.logger = {
    history: '',
    console: undefined,
    setConsole: function(elem) {
        this.console = elem;
    },
    print: function(stuff) {
        this.console.innerText += stuff;
    },
    println: function(stuff) {
        this.print(stuff);
        this.println('\n');
    }
};
