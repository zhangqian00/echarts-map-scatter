$(function(){
	let myCharts = echarts.init(document.getElementById('cityMap'));
	$.get('./libs/echarts/guangzhou.json',function(data){
		echarts.registerMap('guangzhou', data, {});
		var mapData = [ // 地图数据
			{name: '海珠区', value: 19},
			{name: '番禺区', value: 22},
			{name: '白云区', value: 22},
			{name: '从化区', value: 33},
			{name: '花都区', value: 23},
			{name: '黄埔区', value: 24},
			{name: '荔湾区', value: 44},
			{name: '萝岗区', value: 55},
			{name: '南沙区', value: 66},
			{name: '天河区', value: 22},
			{name: '越秀区', value: 19},
			{name: '增城区', value: 31}
		];
		var sanData = [ // 散点数据
			{name: '散点1', value: 19},
			{name: '散点2', value: 14},
			{name: '散点3', value: 19},
			{name: '散点4', value: 12},
			{name: '散点5', value: 19},
			{name: '散点6', value: 15}
		];
		var geoCoordMap = { // 散点坐标
			'散点1': [113.52, 23.179],
			'散点2': [113.42, 23.279],
			'散点3': [113.32, 23.379],
			'散点4': [113.22, 23.479],
			'散点5': [113.12, 23.579],
			'散点6': [113.62, 23.179],
		};
		var convertData = function (data) { // 处理数据函数
			var res = [];
			for (var i = 0; i < data.length; i++) {
				var geoCoord = geoCoordMap[data[i].name];
				if (geoCoord) {
					res.push({
						name: data[i].name,
						value: geoCoord.concat(data[i].value)
					});
				}
			}
			return res;
		};
		let option = { // echarts 配置
			tooltip: {
			    trigger: 'item'
			},
			geo: { // 地图配置
				show: true,
				map: 'guangzhou',
				label: {
					normal: {
						show: false
					},
					emphasis: {
						show: false
					}
				},
				roam: false,
				itemStyle: {
					normal: {
						areaColor: '#47D1FF',
						borderColor: '#3B5077'
					},
					emphasis: {
						areaColor: '#2B91B7'
					}
				},
				zoom: 1.2
			},
			series: [{ // 散点配置
			    name: '数量',
			    type: 'effectScatter',
			    coordinateSystem: 'geo',
			    data: convertData(sanData),
			    symbolSize: function (val) {
			        return val[2];
			    },
			    showEffectOn: 'emphasis',
			    rippleEffect: {
			        brushType: 'stroke'
			    },
			    hoverAnimation: true,
			    label: {
					normal: {
						formatter: '{b}',
						position: 'right',
						show: false
					},
					emphasis: {
						show: true
					}
			    },
			    itemStyle: {
					normal: {
						color: '#ff8003'
					}
			    }
			}, { // 地图配置
			    name: '工程数',
			    type: 'map',
			    mapType: 'guagzhou', // 自定义扩展图表类型
			    geoIndex: 0,
			    // aspectScale: 0.75, // 长宽比
			    itemStyle: {
					normal: {label: {show: true}},
					emphasis: {label: {show: true}}
			    },
			    data: mapData
			}]
		};
		myCharts.setOption(option);
	});
});