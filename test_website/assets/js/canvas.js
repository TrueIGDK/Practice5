function canvas(selector, options){
    const canvas = document.querySelector(selector);
    canvas.classList.add('canvas')
    canvas.setAttribute('width', `${options.width || 400}px`)
    canvas.setAttribute('height', `${options.height || 300}px`)

    const context = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect();

    // ...

    let isPaint = false
    let points = []
    const addPoint = (x, y, dragging) => {
        points.push({
            x: (x - rect.left),
            y: (y - rect.top),
            color: options.strokeColor,
            width: options.strokeWidth,
            dragging: dragging
        })
    }

    const redraw = () => {
        //очищуємо  canvas
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        context.lineJoin = "round";
        let prevPoint = null;
        for (let point of points){
            context.strokeStyle = point.color;
            context.lineWidth = point.width;
            context.beginPath();
            if (point.dragging && prevPoint){
                context.moveTo(prevPoint.x, prevPoint.y)
            } else {
                context.moveTo(point.x - 1, point.y);
            }
            context.lineTo(point.x, point.y)
            context.closePath()
            context.stroke();
            prevPoint = point;
        }
    }

    const mouseDown = event => {
        isPaint = true
        addPoint(event.pageX, event.pageY);
        redraw();
    }

    const mouseMove = event => {
        if(isPaint){
            addPoint(event.pageX, event.pageY, true);
            redraw();
        }
    }

// додаємо обробку подій
    canvas.addEventListener('mousemove', mouseMove)
    canvas.addEventListener('mousedown', mouseDown)
    canvas.addEventListener('mouseup',() => {
        isPaint = false;
    });
    canvas.addEventListener('mouseleave',() => {
        isPaint = false;
    });

    const toolBar = document.getElementById('toolbar')
    const clearBtn = document.createElement('button')
    clearBtn.classList.add('btn')
    clearBtn.textContent = 'Clear'

    clearBtn.addEventListener('click', () => {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            points = [];
    })
    toolBar.insertAdjacentElement('afterbegin', clearBtn)

    const download = document.createElement('button');
    download.classList.add('btn');
    download.textContent = 'Download';

    download.addEventListener('click', () => {
        const dataUrl = canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
        const newTab = window.open('about:blank','image from canvas');
        newTab.document.write("<img src='" + dataUrl + "' alt='from canvas'/>");
    })
    toolBar.insertAdjacentElement('afterbegin', download)

    const save = document.createElement('button');
    save.classList.add('btn');
    save.textContent = 'Save';

    save.addEventListener('click', () => {
        console.log(document.querySelector(".header"));
        localStorage.setItem ('points', JSON.stringify(points));
    })
    toolBar.insertAdjacentElement('afterbegin', save)

    localStorage.setItem('points', JSON.stringify(points));

    const restore = document.createElement('button');
    restore.classList.add('btn');
    restore.textContent = 'Restore';

    restore.addEventListener('click', () => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        points = [];
        points = JSON.parse(localStorage.getItem("points"));
        redraw();
    })
    toolBar.insertAdjacentElement('afterbegin', restore)

    const time = document.createElement('button');
    time.classList.add('btn');
    time.textContent = 'Time';

    time.addEventListener('click', () => {
        let data = new Date();
        context.strokeText(data.toString(), 0, 20);
    })
    toolBar.insertAdjacentElement('afterbegin', time)

    const brushColor = document.createElement('input');
    brushColor.setAttribute('type', 'color')
    brushColor.setAttribute('value', options.strokeColor)

    brushColor.addEventListener('change', (e) => {
        options.strokeColor = brushColor.value;
    })
    toolBar.insertAdjacentElement('afterend', brushColor)

    const brushSize = document.createElement('input');
    brushSize.setAttribute('type', 'range');
    brushSize.setAttribute('value', options.strokeWidth);
    brushSize.setAttribute('min',  options.strokeWidth);
    brushSize.setAttribute('max',  options.strokeWidth + 25);

    brushSize.addEventListener('change', (e) => {
        options.strokeWidth= brushSize.value;
    })
    toolBar.insertAdjacentElement('afterend', brushSize)

    const backgroundChange = document.createElement('button');
    backgroundChange.classList.add('btn');
    backgroundChange.textContent = 'Background';

    backgroundChange.addEventListener('click', () => {
        const img = new Image;
        img.src =`https://images.genius.com/8c4cd9eb73910dc0faeb6b1a77c855d5.939x939x1.jpg`;
        img.onload = () => {
            context.drawImage(img, 0, 0);
        }
    })

    toolBar.insertAdjacentElement('afterbegin', backgroundChange)

    time.innerHTML = '<img src="assets/img/clock.png" height="50px" width="60px" />';
    save.innerHTML = '<img src="assets/img/save.png" height="50px" width="60px" />';
    clearBtn.innerHTML = '<img src="assets/img/clear.png" height="50px" width="60px" />';
    download.innerHTML = '<img src="assets/img/download.png" height="50px" width="60px" />';
    restore.innerHTML = '<img src="assets/img/restore.png" height="50px" width="60px" />';
    backgroundChange.innerHTML = '<img src="assets/img/image.png" height="50px" width="60px" />';
}