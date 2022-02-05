grid = []
for(let x=-1.5; x<1.5; x+=0.1){
    gridyz = []
    for(let y=-1.5; y<1.5; y+=0.1){
        gridz = []
        for(let z=0; z<3; z+=0.1){
            gridz.push([x,y,z])
        }
        gridyz.push(gridz)
    }
    grid.push(gridyz)
}

scale= 0.005
dt = 0.01
for(let t= 0; t<0.01; t+=0.00002){
    console.log(t)
for(let x=0; x<30; x++){
    for(let y=0; y<30; y++){
        for(let z=0; z<30; z++){
            let netForce = [0,0,0]
            currentPos = grid[x][y][z]
            for(let i=-2; i<=2; i++){
                for(let j=-2; j<=2; j++){
                    for(let k=-2; k<=2; k++){
                        if(k==0 && j==0 && i==0)continue
                        try{
                            // rMag
                            let r = [ currentPos[0] - grid[x+i][y+j][z+k][0], currentPos[1] - grid[x+i][y+j][z+k][1], currentPos[2] - grid[x+i][y+j][z+k][2]]
                            rMag = Math.sqrt( r[0]**2 + r[1]**2 + r[2]**2)
                            netForce[0] += r[0]/rMag**3
                            netForce[1] += r[1]/rMag**3
                            netForce[2] += r[2]/rMag**3
                        }catch(e){}
                    }
                }
            }
            grid[x][y][z][0] += scale * dt * netForce[0]
            grid[x][y][z][1] += scale * dt * netForce[1]
            grid[x][y][z][2] += scale * dt * netForce[2]
        }
    }
}
}
fs.writeFile('grid1.js', 'jsonGrid = \''+JSON.stringify(grid)+'\'', function (err) {})

