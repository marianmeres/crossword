
export const config = {
    B: 'cross',

    // hack kvoli "ch", "dz", "dž"...
    // NOTE: pre "dz" a "dž" existuje unicode char, ale budem to replacovat rovnako,
    // nech je chovanie konzistentne
    visualOutputReplaceMap: {
        '~': 'ch',
        '±': 'dz',
        '#': 'dž',
    },

    crosswords: [
        {
            title: 'Jačmeň',
            board: [
                ['š', 'k', 'k', 's', 'e', 'č', 'n', 'a', 'g', 'o', 'b', 'a', 'j'],
                ['v', 'a', 'a', 'e', 'a', 'i', 'j', 'a', 'r', 'm', 'e', 'k', 'y'],
                ['e', 'p', 'ľ', 'j', 'm', 'l', 'o', 'r', 'e', 'd', 'ň', 'a', 'b'],
                ['r', 'u', 't', 'b', 's', 'o', 'a', 'm', 'b', 'r', 'e', 'l', 'a'],
                ['b', 'r', 'a', 'a', 'a', 't', 'd', 'a', 'v', 'č', 'š', 'm', 'm'],
                ['o', 'k', 'v', 'm', 'š', 'a', 'r', 'i', 'š', 'm', 'e', 'r', 'c'],
                ['r', 'o', 'a', 'e', 'b', 'a', 'n', 'o', 'n', 't', 'c', 'i', 'n'],
                ['i', 'v', 'r', 'u', 'n', 'i', 't', 'u', 'l', 'a', 'e', 'p', 'e'],
                ['t', 'á', 'k', 'i', 'č', 'p', 'b', 'a', 'r', 'e', 'l', 'a', 'm'],
                ['k', 's', 'c', 'k', 'a', 'ň', 'a', 'k', 'i', 't', 'a', 'p', 'a'],
                ['a', 'a', 'y', 'č', 'č', 'e', 'r', 'e', 'h', 'a', 's', 'l', 'o']
            ],
            words: [
                'ambrela', 'amencma', 'apatika', 'árešt', 'baňdero', 'baranica',
                'barel', 'boganče', 'buksa', 'cešeňe', 'čaptoš', 'čerehaslo', 'čilota',
                'domek', 'jarmeky', 'kajstrol', 'kapurková', 'kravatľa', 'metla',
                'mlaka', 'oplan', 'papir', 'sejba', 'struna', 'šaľba', 'šmerc',
                'šverboritka', 'viničky'
            ]
        },

        {
            title: 'Pivovar Šariš',
            board: [
                ['č', 'ň', 'p', 'n', 'a', 'm', 'r', 'e', 'm', 'i', 'c' ],
                ['b', 'i', 'f', 'r', 'i', 'š', 't', 'i', 'k', 'u', 'i' ],
                ['r', 'g', 's', 'f', 'č', 'i', 'š', 'r', 'k', 'v', 'g' ],
                ['i', 'e', 'i', 'o', 'a', 'a', 'r', 'e', 'n', 't', 'a' ],
                ['n', 's', 'o', 'g', 'n', 'l', 'r', 'p', 'p', 'p', 'r' ],
                ['č', 'á', 'b', 'j', 'a', 'r', 'a', 'ň', 'a', 'o', 'e' ],
                ['o', 'p', 'e', 'p', 'e', 'c', 'c', 't', 'a', 'v', 't' ],
                ['k', 'l', 'a', 't', 'a', 'i', 'é', 'r', 'e', 'v', 'ľ' ],
                ['š', 'ľ', 'n', 'l', 'c', 'k', 'l', 'o', 'š', 'k', 'a' ],
                ['~', 'i', 'a', 'k', 'a', 'š', 'e', 'g', 'e', 'd', 'r' ],
                ['c', 'i', 'y', 'š', 'o', 'k', 't', 'a', 'ľ', 'e', 'c' ]
            ],
            words: [
                'anjel', 'apatéka', 'brinčok', 'ceľatko', 'cicky', 'cigaretľa',
                'cimerman', 'cinter', 'cuker', 'čarňava', 'degeš', 'falatek',
                'frištik', 'gigac', '~ľapa', 'kalap', 'loška', 'nosič', 'perie',
                'rajbáč', 'renta', 'segiň', 'šepot',
            ],
        },

        {
            title: 'Srdcom východniar!',
            board: [
                ['s', 'a', 's', 'š', 'a', 'c', 'i', 'n', 'd', 'i', 'b', 'r', 'a' ],
                ['t', 'e', 'c', 'd', 'm', 'c', 'e', 'n', 'a', 'h', 'u', 'd', 'k' ],
                ['r', 'o', 'm', 'i', 't', 'a', 'r', 'v', 'z', 'm', 'b', 'l', 'š' ],
                ['u', 'r', 'o', 'i', 'p', 'v', 'l', 'ý', 'o', 'a', 'a', 'a', 'u' ],
                ['ž', 'e', 'b', 'a', 'š', 'a', 'v', 'e', 'l', 'r', 'k', 'b', 'r' ],
                ['ľ', 'g', 'e', 'u', 'r', 'a', 'č', 'a', 'c', 'a', 'k', 'a', 't' ],
                ['a', 'a', 'r', 'o', 'j', 'i', 'r', 'v', 'l', 'p', 'd', 'o', 'e' ],
                ['k', 'l', 'v', 'l', 'd', 'a', 'ň', 'i', 'c', 's', 'r', 'e', 'p' ],
                ['~', 't', 'i', 'a', 'ľ', 'a', 'k', 'r', 'š', 'p', 'a', 't', 'a' ],
                ['o', 'n', 'r', 'i', 'k', 'a', 'o', 'k', 'l', 'e', 'b', 'a', 'n' ],
                ['g', 'a', 'g', 't', 'p', 'd', 'o', 'o', 'b', 'd', 'i', 'v', 'n' ],
                ['g', 'u', 'a', 'č', 'i', 'l', 'a', 'p', 'a', '#', 'n', 'i', 'f' ],
                ['b', 'p', 'a', 'r', 'a', 'z', 'o', 'l', 'a', 'l', 'a', 'v', 'r' ]
            ],
            words: [
                'antlager', 'bašavel', 'bidnica', 'bubak', 'bugiľar', 'bujak',
                'čapica', 'dlaba', 'drabina', 'duhan', 'fin#a', 'garadiče',
                'kapča', 'kleban', 'obdiv', 'obervi', 'otvor', 'parazol', 'patkaň',
                'persciň', 'petruška', 'pokriva', 'pokrovec', 'semiš', 'spara',
                'stružľak', 'šakal', 'škola', 'šmalec', 'špata', 'vajling', 'valal',
                'zvrat'
            ]
        },

        {
            title: 'Šarišský hrad',
            board: [
                ['a', 'm', 'b', 'r', 'e', 'l', 'a', 'ň', 'š', 'b', 'a', 'e' ],
                ['h', 'h', 'o', 'r', 'á', 'r', 'e', 'ň', 'u', 'r', 'č', 'm' ],
                ['u', 'o', 'r', 'i', 'š', 'š', 'a', 'd', 'š', 'i', 'a', 'b' ],
                ['č', 'č', 'p', 'a', 'e', 'a', 'a', 't', 'l', 's', 'r', 'e' ],
                ['ň', 'k', 'a', 'k', 'v', 'r', 'b', 'h', '~', 'e', 'ň', 'r' ],
                ['e', 'ý', 's', 'k', 'o', 'ľ', 'i', 'ľ', 'z', 'a', 'a', 'š' ],
                ['l', 'g', 'u', 'ľ', 'a', 'š', 'a', 'l', 'a', 's', 'v', 'i' ],
                ['a', 'b', 'ľ', '~', 'h', 'n', 'e', 'r', 'c', 'a', 'a', 'k' ],
                ['p', 'd', 'a', 'n', 'i', 'č', 'v', 'a', 'l', 'h', 'a', 'z' ]
            ],
            words: [
                'ambrela', 'bľa~a', 'brezle', 'budar', 'bukva', 'čakan', 'čarňava',
                'emberšik', 'guľaša', 'hopko', 'horáreň', 'ihliče', 'kešeň', 'paleňčuha',
                'pasuľa', 'rasca', 'šabľa', 'va~tar', 'varha', 'zahlavčina'
            ]
        },

        {
            title: 'Dva piva',
            board: [
                ['s', 'm', 'a', 'r', 'k', 'e', 'ľ', 'n', 'í', 'k', 's'],
                ['t', 'v', 'g', 'a', 'm', 'b', 'y', 'j', 'l', 'e', 'd'],
                ['o', 'e', 'v', 'a', 'p', 'a', 'a', 'e', 'g', 'š', 'c'],
                ['l', 'r', 's', 'a', 'r', 'š', 'b', 'i', 'a', 'e', 'a'],
                ['u', 'c', 'l', 'a', 'č', 'a', 'ň', 'o', 'l', 'ň', 'n'],
                ['v', 'a', 'p', 'u', 'n', 'r', 'd', 'a', 'd', 'e', 'i'],
                ['k', 'j', 'r', 'o', 'e', 'i', 'm', 'i', '±', 'z', 'n'],
                ['a', 'k', 'p', 't', 'v', 'š', 'c', 'e', 'č', 'i', 'o'],
                ['a', 'k', 'n', 'á', 'f', 'e', 'ľ', 'a', 'v', 'e', 'g'],
                ['a', 'i', 'n', 's', 't', 'a', 'r', 'e', 'n', 'a', 'r'],
                ['c', 'e', 'h', 'l', 'a', 't', 's', 'a', 'ľ', '~', 'o']
            ],
            words: [
                'cehla', 'cinter', 'diván', 'fánka', 'gamby', 'garadiče', 'jaščurka',
                'kalap', 'kešeň', 'kleban', 'ne±eľa', 'o~ľasta', 'orgonina', 'ozdoba',
                'povera', 'sanica', 'segiň', 'smarkeľník', 'starena', 'stoluvka',
                'šmalec', 'vercajk'
            ]
        },

        {
            title: 'Iskra',
            board: [
                ['ň', 'k', 'o', 't', 'y', 'b', 'o', 'd', 'r'],
                ['r', 'a', 'š', 'k', 'a', 'b', 'r', 'i', 'a'],
                ['d', 's', 'k', 'č', 'l', 'i', 'm', 'u', 'č'],
                ['k', 'r', 'i', 't', 'š', 'k', 'k', 'a', 'a'],
                ['o', 'k', 'a', 'ľ', 'a', 'n', 'c', 'ú', 'g'],
                ['l', 'r', 'a', 'b', 'r', 'p', 'š', 'š', 'a'],
                ['e', 'k', 'a', 'e', 'i', 'i', 'u', 'o', 'm'],
                ['g', 't', 'm', 's', 'š', 'n', 'a', 'g', 'i'],
                ['y', 'i', 'e', 'k', 'k', 'k', 'a', 'n', 'n'],
                ['ň', 'k', 'a', 'a', 't', 'r', 'o', 'a', 'č'],
                ['a', 'b', 'n', 'o', 'k', 'e', 'r', 'l', 'e']
            ],
            words: [
                'ancúg', 'aorta', 'bačik', 'bakšiš', 'čumil', 'dobytok', 'drabina',
                'drišľak', 'gačar', 'gamby', 'gaminče', 'kolegyňa', 'langoš', 'lokše',
                'nokerle', 'patkaň', 'pisek', 'raška', 'remiň', 'šunka', 'tabak'
            ]
        },

        {
            title: 'Chmeľ',
            board: [
                ['n', 'e', 'b', 'o', 'š', 'č', 'i', 'c', 'i'],
                ['l', 'k', 'i', 'c', 's', 'o', 'v', '~', 'k'],
                ['e', 'z', 'a', '~', 'l', 'e', 'l', 'a', 'r'],
                ['v', 'é', 'm', 'k', '~', 'e', 'm', 'a', 'e'],
                ['a', 'm', 'a', 'r', 'c', 'b', 'ď', 'c', 'p'],
                ['š', 'ľ', 'a', 'c', 'r', 'a', 'i', 'n', 'š'],
                ['a', 'm', 'e', 'e', 'i', 'c', 'r', 'u', 'a'],
                ['b', 'k', 'l', '±', 'k', 'n', 'h', 'a', 'k'],
                ['a', 'a', 'č', 'y', 'e', 'a', 'd', 'e', 'b'],
                ['l', 'a', 'p', 'a', 'j', 'n', 'ľ', 'i', 'a'],
                ['d', 'a', 't', 'u', 'm', 'a', 'l', 'a', 'b']
            ],
            words: [
                'ambrela', 'anďel', 'babka', 'balamuta', 'baracka', 'bašavel',
                'bidnica', 'cicky', 'dlaba', 'ekzém', '~voscik', 'lapaj', 'mačka',
                'mar~ev', 'neboščici', 'ne±eľa', 'paloš', 'šperk', 'šuhaj'
            ]
        },
        {
            title: 'Šariš',
            board: [
                ['a', 'n', 'i', 'r', 'i', 'v', '#', 'š', 'k', 'f', 's', 'p', 's', 'n', 'k'],
                ['k', 'i', 'd', 'ľ', 'a', 'a', 'a', 'a', 'a', 'o', 'u', 'u', 'a', 'a', 'e'],
                ['n', 'č', 'r', 'k', 'v', 'c', 'ň', 'g', 'b', 'r', 'k', 't', 'p', 't', 'v'],
                ['a', 'o', 'i', 'o', 'i', 'š', 'a', 'r', 'd', 'š', 'ň', 's', 'o', 'r', 'a'],
                ['š', 't', 't', 'n', 'i', 'n', 'a', 'o', 'i', 'u', 'a', 'v', 'o', 'a', 'l'],
                ['a', 'a', 'd', 'v', 'i', 'l', 'm', 'f', 't', 's', 'a', 'r', 'o', 'p', 'h'],
                ['ľ', 'i', 'š', 'a', 't', 'e', 'ľ', 'g', 'o', 'r', 'd', 'n', 'a', 's', 'a'],
                ['b', 'a', 'r', 'a', 'c', 'k', 'a', 'n', 'i', 'ľ', 'ž', 'r', 'e', 'm', 'z']
            ],
            words: [
                'asandrogľe', 'atika', 'baracka', 'bidnica', 'bľašanka', 'bralta',
                'domec', '#avot', '#virina', 'fagan', 'fiškus', 'foršus', 'kapsa',
                'kidľa', 'konva', 'ničota', 'porast', 'poskok', 'spartan', 'sukňa',
                'tovar', 'višňa', 'vstup', 'zahlavek', 'zmeržľina'
            ]
        },
        {
            title: 'Majster varne',
            board: [
                ['g', 'm', 'š', 't', 'i', 'c', 'a', 'a', 'a', 'j', 'r'],
                ['a', 'k', 'č', 'o', 'r', 's', 'g', 'n', 'k', 'e', 'i'],
                ['r', 't', 'š', 'e', 'e', 'm', 'á', 'a', 'ď', 'ň', 'n'],
                ['a', 'p', 'm', 'a', 'r', 'a', 'g', 'm', 'o', 'e', 'g'],
                ['d', 'š', 'e', '~', 'p', 'r', 'o', 'r', 'l', 'š', 'l'],
                ['i', 'e', 'l', 'a', 'r', '~', 'r', 'i', 'a', 'e', 'o'],
                ['č', 'š', 'i', 'r', 'p', 'e', 'y', 'f', 'v', 'c', 'd'],
                ['e', 'r', 'n', 'k', 'a', 'v', 'á', 'ž', 'k', 'a', 'k'],
                ['~', 'e', 'a', 'e', 'd', 'r', 'i', 'e', 'k', 'r', 'y'],
                ['n', 'v', 'e', 'ľ', 'k', 'e', 's', 'u', 'f', 'a', 'e']
            ],
            words: [
                'anďel', 'cešeňe', 'driek', 'firma', 'fusekľe', 'gágory', 'garadiče',
                '~arkeľ', '~riapa', '~yžka', 'loďka', 'mar~ev', 'prišč', 'rampa',
                'ringlodky', 'ročka', 'šafár', 'šmelina', 'šmerc', 'štica', 'vážka',
                'verše'
            ]
        },
        {
            title: 'Srdcom na východe',
            board: [
                ['s', 'r', 'r', 'ť', 's', 'o', 'v', 'a', 'ľ', 't', 'a', 'm', 'š'],
                ['p', 'k', 'á', 'd', 'j', 'a', 'š', 'č', 'u', 'r', 'k', 'a', 'c'],
                ['č', 'r', 'o', 'h', 'o', 'a', 't', 'o', 'p', 'u', 'l', 'g', 'k'],
                ['a', 'k', 'o', 'n', 'u', 'r', 'a', 'd', 'm', 'á', 'n', 'm', 'i'],
                ['v', 'g', 'o', 'r', 'a', 'l', 'n', 'm', 't', 'a', 's', 'a', 'n'],
                ['a', 'n', 'i', 'n', 'o', 'g', 'r', 'o', 'h', 'k', 'a', 'm', 'v'],
                ['r', 'ň', 'á', 'p', 'u', 'k', 's', 'r', 'n', 'n', 'l', 'a', 'o'],
                ['g', 'v', 't', 'e', 'ý', 'r', 'i', 'a', 'd', 'á', 'l', 'v', '#'],
                ['o', 'o', '~', 'l', 'n', 'f', 'o', 'v', '±', 'r', 'v', '~', 'ž'],
                ['š', 'd', 'a', 'k', 'n', 'a', 'š', 'a', 'ľ', 'b', 'e', 'i', 'i'],
                ['p', 'r', 'a', 's', 'a', 'a', 'k', 'č', 'a', 'b', 'u', 'l', 'd']
            ],
            words: [
                'bľašanka', 'bránka', 'čavargoš', 'darunok', 'diván', 'diž#ovnik',
                'dlubačka', 'firhang', 'ganok', 'glupota', 'goral', 'jaščurka',
                'li~va', 'loptoš', 'luhár', 'magma', 'mlá±a', 'morava', 'orgonina',
                'pásmo', 'prasa', 'prorok', 'sklep', 'skupáň', 'srnka', 'šalát',
                'šmatľavosť', 'vláda'
            ]
        },
        {
            title: 'Sladovnícky majster',
            board: [
                ['r', 'a', 'š', 'k', 'a', 's', 'a', 'k', 'v', 'o', 'k', 'a', 'v'],
                ['l', 'g', 'a', 'a', 'c', 'i', 'v', 'a', 'j', 'i', 'p', 'a', 'p'],
                ['a', 'n', 'i', 'n', 'a', 'č', 'o', 'k', 'l', 'y', '~', 'e', 'b'],
                ['k', 'u', 'o', 'í', 'i', 'k', 'a', 'b', 'a', 't', 'r', 'd', 'a'],
                ['í', 'š', 'o', 'r', 'v', 'v', 'r', 'n', 'a', 's', 'í', 'm', 'r'],
                ['n', 'e', 'u', 't', 'd', 'e', 'c', 'r', 'c', 'o', 'a', 'k', 'a'],
                ['ľ', 'k', 'y', 'i', 'š', 'a', 'r', 'i', 'š', 'm', 'e', 'r', 'c'],
                ['e', 'v', 'f', 'v', 'b', 'm', 'ň', 'c', 'a', 'i', 'e', 'm', 'k'],
                ['k', 'a', 'b', 'u', 'b', 'b', 'a', 'r', 'a', 'k', 'š', 'y', 'a'],
                ['r', 'l', 'č', 'j', 'š', 'r', 'p', 's', 'u', 'j', 'j', 'k', 's'],
                ['a', 'a', 't', 'a', 'm', 'e', 'n', 'c', 'm', 'a', 'k', 'e', 'y'],
                ['m', 'l', 'á', 'ď', 'a', 'l', 'r', 'r', 'k', 'a', 'č', 'u', 'r'],
                ['s', 'a', 'b', 'i', 'b', 'a', 'n', 'd', 'u', 'r', 'k', 'y', 'k']
            ],
            words: [
                'agnušek', 'ambrela', 'amencma', 'bandurky', 'baracka', 'bibas',
                'bubak', 'cuker', 'fušer', 'kačur', 'kočanina', 'krysa', 'kurič',
                'kyjak', 'mačuba', 'mláďa', 'mosty', 'ňadro', 'persciň', 'pijavica',
                'pramama', 'raška', 'smarkeľník', 'šerblik', 'šišky', 'šmerc', 'tabak',
                'va~tar', 'vakovka', 'valal', 'vercajk', 'vitrína'
            ]
        }
    ]
};


// {
//     title: 'Srdcom východniar!',
//     board: [
//         ['k', 'o', 't', 'š', 'r', 'i', 'f', 's', 'd', 'r'], // y: 0
//         ['j', 'd', 'c', 'o', 'ž', 'm', 'v', 'r', 'ý', 'o'], // y: 1
//         ['a', 'b', 'g', 'g', 'a', 'c', 'a', 'h', '!', 'l'],
//         ['c', 'a', 'r', 'ú', 'm', 'b', 'o', 'c', 'a', 'd'],
//         ['r', 'n', 'u', 'c', 'i', 'd', 'e', 'j', 'ľ', 'e'],
//         ['e', 'd', 'ľ', 'n', 'l', 'c', 'b', 'o', 'u', 'r'],
//         ['v', 'u', 'a', 'a', 'o', 'í', 'n', 'k', 'b', 'e'],
//         ['i', 'r', 'u', 'm', 'k', 'ľ', 'a', 'a', 'e', 'v'],
//         ['a', 'k', 'n', 'a', 'č', 'a', 'm', 't', 'g', 'ž'],
//         ['a', 'y', 'k', 'r', 'e', 'c', 'a', 'p', 'r', 'd']
//         // x:0   1    2
//     ],
//     words: [
//         'ancúg', 'bandurky', 'drabina', 'džveredlo', 'firštok',
//         'gebuľa', 'gruľa', 'kolimaž', 'lajbík', 'mačanka',
//         'ocec', 'pacerky', 'rumkľa', 'takoj', 'vercajk'
//     ]
// },