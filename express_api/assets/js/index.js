// js scripts for management page

var summary_page = document.getElementById('summary');
var add_page = document.getElementById('add');
var sum_shown = true;
var add_shown = false;


summary_page.onclick = function() {
    if (sum_shown == false) {
        document.getElementById('infopanel').style.display = 'block';
        document.getElementById('addpanel').style.display = 'none';

        document.getElementById('summary').style['font-size'] = '1.8vw';
        document.getElementById('summary').style.background = '-webkit-linear-gradient(#ee2b52, #fcb22b)';
        document.getElementById('summary').style['-webkit-background-clip'] = 'text';
        document.getElementById('summary').style['-webkit-text-fill-color'] = 'transparent';

        document.getElementById('add').style['font-size'] = '1.5vw';
        document.getElementById('add').style.background = 'white';
        document.getElementById('add').style['-webkit-background-clip'] = 'text';
        document.getElementById('add').style['-webkit-text-fill-color'] = 'transparent';

        sum_shown = true;
        add_shown = false;
    }
};

add_page.onclick = function() {
    if (add_shown == false) {
        document.getElementById('infopanel').style.display = 'none';
        document.getElementById('addpanel').style.display = 'block';
        
        document.getElementById('summary').style['font-size'] = '1.5vw';
        document.getElementById('summary').style.background = 'white';
        document.getElementById('summary').style['-webkit-background-clip'] = 'text';
        document.getElementById('summary').style['-webkit-text-fill-color'] = 'transparent';
        
        document.getElementById('add').style['font-size'] = '1.8vw';
        document.getElementById('add').style.background = '-webkit-linear-gradient(#ee2b52, #fcb22b)';
        document.getElementById('add').style['-webkit-background-clip'] = 'text';
        document.getElementById('add').style['-webkit-text-fill-color'] = 'transparent';

        sum_shown = false;
        add_shown = true;
    }
};
