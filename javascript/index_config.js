var Default_Config = {
	/*
		各模块定义 返回字段及配置
		{
			title:字段名称,
			desc:字段具体描述,
			type:返回类型,
			showType:显示类型,
			includeInput:是否含input,
			placeholder:input下的placeholder值,
			isBlock:是否整行,
			clearFloat:是否清楚浮动,
			transferObj:转换字段,
			replaceStr:字段名，该属性优先级最高，存在该字段内容时优先使用该字段配置显示
		}

		showType:
			Number数字, 默认0
			Money金钱, 默认0.00
			Date时间, 默认''
			Rate费率, 默认0%
			String字符串, 默认''
			Image图片地址, 默认''
			ImagesArr轮播图片地址, 默认[]
			CardNo卡号, 默认''

		transferObj:{
			key:新字段(不存在则默认赋值给原字段),
			value:{
				新字段转换后对应值修改对象
				0:'xx',
				1:'yy'
			}
		}
	*/
	// 默认模块配置
	Config_Model_default : {
		title: '字段名称',
		desc: '字段描述',
		type: 'String',
		showType: 'String',
		isBlock: false,
		includeInput: false,
		placeholder:'',
		clearFloat:false
	},
	/*
		具体模块字段定义
		merchant_certified:商户认证
		merchant_cloud_treasure_apply:商户云商宝申请
		customer_cloud_treasure_apply:用户云商宝申请
		public_apply:公益申请
	*/
	Config_Model_Str_Obj : {
		merchant_certified: {
			id: {
				title: '编号',
				desc: '主键ID',
				type: 'long',
				showType: 'Number'
			},
			loginName:{
				title: '用 户 名',
				desc: '商户用户名'
			},
			mOrgName:{
				title: '机构名称',
				desc:'公司名称(认证资料)',
				isBlock:true
			},
			province: {
				title: '省份',
				desc: '省(认证资料-所属地区)',
				type: 'int',
				showType: 'Number'
			},
			city: {
				title: '城市',
				desc: '市(认证资料-所属地区)',
				type: 'int',
				showType: 'Number'
			},
			region: {
				title: '区/县/镇',
				desc: '县(认证资料-所属地区)',
				type: 'int',
				showType: 'Number',
				transferObj:{
					key:'regionNum'
				}
			},
			regionNum: {
				title: '邮政编码',
				desc: '邮政编码',
				type: 'int'
			},
			provinceName: {
				title: '省份',
				desc: '省(认证资料-所属地区)'
			},
			cityName: {
				title: '城市',
				desc: '市(认证资料-所属地区)'
			},
			regionName: {
				title: '区/县/镇',
				desc: '县(认证资料-所属地区)'
			},
			mNum: {
				title: '商户编号',
				desc: '商户编号'
			},
			mName: {
				title: '商户简称',
				desc: '商户简称(基本资料)'
			},
			mMobile: {
				title: '联系方式',
				desc: '商户联系方式(基本资料)'
			},
			mLicenceNum: {
				title: '营业执照号码',
				desc: '营业执照号码'
			},
			address: {
				title: '商户地址',
				desc: '商户地址(基本资料)',
				isBlock:true
			},
			businessScope: {
				title: '经营项目',
				desc: '商户经营项目(基本资料)',
				isBlock:true
			},
			auditStatus: {
				title: '审核状态',
				desc: '审核状态',
				type: 'int',
				showType: 'String',
				transferObj: {
					key: 'curStatus',
					value: {
						0: '审批中',
						1: '审批成功',
						2: '审批失败',
						3: '未审核'
					}
				}
			},
			curStatus: {
				title: '审核状态',
				desc: '审核状态'
			},
			statusPermit: {
				title: '许可状态',
				desc: '许可状态',
				type:'int',
				transferObj:{
					value:{
						0:'未经允许',
						1:'允许经营'
					}
				}
			},
			applyTime: {
				title: '申请时间',
				desc: '申请时间',
				type:'long',
				showType:'Date'
			},
			auditTime: {
				title: '审批时间',
				desc: '审批时间',
				type:'long',
				showType:'Date'
			},
			lng: {
				title: '经 &nbsp; &nbsp;度',
				desc: '经度'
			},
			lat: {
				title: '纬 &nbsp; &nbsp;度',
				desc: '纬度'
			},
			mDesc: {
				title: '商户描述',
				desc: '商户描述'
			},
			mTypeId: {
				title: '商户类型',
				desc: '商户类型ID(基本资料)',
				type:'int'
			},
			mType: {
				title: '商户类型',
				desc: '商户类型(基本资料)'
			},
			isCharge: {
				title: '是否付费',
				desc: '拒绝理由',
				type:'int',
				transferObj:{
					value:{
						0:'否',
						1:'是'
					}
				}
			},
			chargeAmount: {
				title: '付费金额',
				desc: '付费金额',
				type:'double',
				showType:'Money'
			},
			likeCount: {
				title: '拒绝理由',
				desc: '点赞次数',
				type:'int',
				showType:'Number'
			},
			keyword: {
				title: '关 键 词',
				desc: '关键词'
			},
			picIndex: {
				title: '封面图片',
				desc: '封面图片(基本资料)',
				showType:'Image'
			},
			picIdFront: {
				title: '法定代表人身份证正面',
				desc: '法定代表人身份证正面',
				showType:'Image'
			},
			picIdBack: {
				title: '法定代表人身份证反面',
				desc: '法定代表人身份证反面',
				showType:'Image'
			},
			picIdHold: {
				title: '法定代表人手持身份证',
				desc: '法定代表人手持身份证',
				showType:'Image'
			},
			picMerLicence: {
				title: '营业执照',
				desc: '营业执照(认证资料)',
				showType:'Image'
			},
			picMerTax: {
				title: '税务登记证',
				desc: '税务登记证(对公账户资料)',
				showType:'Image'
			},
			picMerOrg: {
				title: '组织机构代码证',
				desc: '组织机构代码证(对公账户资料)',
				showType:'Image'
			},
			picMerObapc: {
				title: '开户许可证',
				desc: '开户许可证(对公账户资料)',
				showType:'Image'
			},
			picMerOther: {
				title: '其它证件',
				desc: '其它证件(认证资料)',
				showType:'Image'
			},
			editCount: {
				title: '简称修改次数',
				desc: '商户简称修改次数,小于等于1时可改',
				type:'int',
				showType:'Number'
			},
			isCredit: {
				title: '是否存在商户云商宝',
				desc: '是否存在商户云商宝',
				type:'int',
				transferObj:{
					value:{
						0:'否',
						1:'是'
					}
				}
			},
			rejectReason: {
				title: '认证审核失败原因',
				desc: '认证资料审核失败原因',
				isBlock: true
			},
			reason: {
				title: '公账审核失败原因',
				desc: '公账资料审核失败原因',
				isBlock: true
			},
			isCollect: {
				title: '是否被收藏',
				desc: '是否被收藏',
				type:'int',
				transferObj:{
					value:{
						0:'否',
						1:'是'
					}
				}
			},
			picsBanner: {
				title: '轮播图片数组',
				desc: '轮播图片数组',
				showType: 'ImagesArr'
			},
			coupons: {
				title: '优惠券数',
				desc: '优惠券数组'
			},
			cardNo: {
				title: '开户卡号',
				desc: '开户卡号',
				showType:'CardNo',
				isBlock:true
			},
			branchBankName: {
				title: '开户支行',
				desc: '开户支行',
				isBlock:true
			}
		},
		merchant_cloud_treasure_apply: {
			id: {
				title: '编号',
				desc: '主键ID',
				type: 'long',
				showType: 'Number'
			},
			loginName:{
				title: '用 户 名',
				desc: '用户登录名'
			},
			status: {
				title: '审核状态',
				desc: '审核状态',
				type: 'int',
				showType: 'String',
				transferObj: {
					key: 'curStatus',
					value: {
						0: '未审核',
						1: '审批成功',
						2: '审批失败'
					}
				}
			},
			curStatus: {
				title: '审核状态',
				desc: '审核状态'
			},
			reason: {
				title: '拒绝理由',
				desc: '原因',
				isBlock: true
			},
			createTime: {
				title: '创建时间',
				desc: '创建时间',
				type: 'long',
				showType: 'Date'
			},
			operationTime: {
				title: '审核时间',
				desc: '审核时间',
				type: 'long',
				showType: 'Date'
			},
			mName: {
				title: '商户名称',
				desc: '商户名称'
			},

			amountAll: {
				title: '总 额 度',
				desc: '总额度',
				type: 'BigDecimal',
				showType: 'Money',
				includeInput:true,
				placeholder:'1,000,000'
			},
			amountMax: {
				title: '单人额度',
				desc: '单人可申请最高额度',
				type: 'BigDecimal',
				showType: 'Money',
				includeInput:true,
				placeholder:'1,000'
			},
			commission: {
				title: '手 续 费',
				desc: '手续费',
				type: 'BigDecimal',
				showType: 'Rate',
				includeInput:true,
				placeholder:'0.015'
			},
			applyPerson: {
				title: '已申请数',
				desc: '已申请人数',
				type: 'int',
				showType: 'Number'
			},
			auditTime: {
				title: '审批时间',
				desc: '审批时间',
				type: 'long',
				showType: 'Date'
			},
			applyAmount: {
				title: '已申请额',
				desc: '已申请金额',
				type: 'BigDecimal',
				showType: 'Money'
			},
			shouldIncome: {
				title: '应收金额',
				desc: '应收金额',
				type: 'BigDecimal',
				showType: 'Money'
			},
			actualIncome: {
				title: '实际收款',
				desc: '实际收款',
				type: 'BigDecimal',
				showType: 'Money'
			},
			picIndex: {
				title: '商户封面',
				desc: '商户封面照片',
				showType: 'Image'
			}
		},
		customer_cloud_treasure_apply: {
			id: {
				title: '编号',
				desc: '主键ID',
				type: 'long',
				showType: 'Number'
			},
			loginName:{
				title: '用户登录名',
				desc: '用户登录名'
			},
			merLoginName:{
				title: '商户登录名',
				desc: '商户登录名'
			},
			amountApply: {
				title: '申请额度',
				desc: '申请额度',
				type: 'double',
				showType: 'Money',
				includeInput:true,
				placeholder:''
			},
			status: {
				title: '审核状态',
				desc: '审核状态',
				type: 'int',
				showType: 'String',
				transferObj: {
					key: 'curStatus',
					value: {
						0: '未审核',
						1: '审批成功',
						2: '审批失败'
					}
				}
			},
			curStatus: {
				title: '审核状态',
				desc: '审核状态'
			},
			reason: {
				title: '拒绝理由',
				desc: '原因',
				isBlock: true
			},
			createTime: {
				title: '创建时间',
				desc: '创建时间',
				type: 'long',
				showType: 'Date'
			},
			operationTime: {
				title: '审核时间',
				desc: '审核时间',
				type: 'long',
				showType: 'Date'
			},
			auditTime: {
				title: '审核时间',
				desc: '审核时间',
				type: 'long',
				showType: 'Date'
			},
			mName: {
				title: '商户简称',
				desc: '商户简称'
			},
			merApplyMax: {
				title: '当前商户可申请额度',
				desc: '当前商户可申请额度',
				type: 'BigDecimal',
				showType: 'Money'
			},
			applyMax: {
				title: '当前会员可申请额度',
				desc: '当前会员可申请额度',
				type: 'BigDecimal',
				showType: 'Money'
			},
			merAmountApply: {
				title: '商户当前可申请额度',
				desc: '商户当前可申请额度',
				type: 'BigDecimal',
				showType: 'Money'
			},
			amountMax: {
				title: '可使用额度',
				desc: '可使用额度',
				type: 'BigDecimal',
				showType: 'Money'
			},
			amountUsed: {
				title: '已使用额度',
				desc: '已使用额度',
				type: 'BigDecimal',
				showType: 'Money'
			},
			releaseTime: {
				title: '额度释放时间',
				desc: '额度释放时间',
				type: 'long',
				showType: 'Date'
			},
			isRelease: {
				title: '释放状态',
				desc: '是否释放',
				type: 'int',
				transferObj:{
					value:{
						0:'未释放',
						1:'已释放'
					}
				}
			},
			nickname: {
				title: '会员昵称',
				desc: '会员昵称',
				replaceStr:'userName'
			},
			userName: {
				title: '真实姓名',
				desc: '真实姓名'
			},
			picIndex: {
				title: '商户头像',
				desc: '商户头像',
				showType: 'Image'
			},
			picHead: {
				title: '会员头像',
				desc: '会员头像',
				showType: 'Image'
			}
		},
		public_apply: {
			id: {
				title: '编号',
				desc: '主键ID',
				type: 'long',
				showType: 'Number'
			},
			loginName:{
				title: '登录名',
				desc: '登录名'
			},
			title:{
				title: '标题',
				desc: '标题'
			},
			desc:{
				title: '描述',
				desc: '描述',
				isBlock:true
			},
			status: {
				title: '审核状态',
				desc: '审核状态',
				type: 'int',
				showType: 'String',
				transferObj: {
					key: 'curStatus',
					value: {
						0: '未审核',
						1: '审批成功',
						2: '审批失败'
					}
				}
			},
			curStatus: {
				title: '审核状态',
				desc: '审核状态'
			},
			pubStatus: {
				title: '发布状态',
				desc: '发布状态'
			},
			startTime: {
				title: '开始时间',
				desc: '开始时间',
				type: 'long',
				showType: 'Date'
			},
			endTime: {
				title: '结束时间',
				desc: '结束时间',
				type: 'long',
				showType: 'Date'
			},
			createTime: {
				title: '创建时间',
				desc: '创建时间',
				type: 'long',
				showType: 'Date'
			},
			cashMax: {
				title: '目标金额',
				desc: '目标金额',
				type: 'double',
				showType: 'Money'
			},
			cashCurrent: {
				title: '当前金额',
				desc: '当前金额',
				type: 'double',
				showType: 'Money'
			},
			applyId: {
				title: '公益申请',
				desc: '公益申请',
				type: 'long',
				showType:'String'
			},
			numJoin: {
				title: '已参与人数',
				desc: '已参与人数',
				type: 'int',
				showType:'Number'
			},
			pic1: {
				title: '封面',
				desc: '封面',
				showType: 'Image'
			},
			pic2: {
				title: '图片2',
				desc: '图片2',
				showType: 'Image'
			},
			pic3: {
				title: '图片3',
				desc: '图片3',
				showType: 'Image'
			},
			pic4: {
				title: '图片4',
				desc: '图片4',
				showType: 'Image'
			},
			pic5: {
				title: '图片5',
				desc: '图片5',
				showType: 'Image'
			}
		}
	},
	/*
		各模块对应网格参数配置
	*/
	// 默认网格配置
	Config_Grid_default : {
		type:'',
		grid_title:'未审核',
		list:{
			pror_key:'listAllUnchecked', //listAllUnchecked:所有未审核 listAllFailed:所有审核失败	listAllSuccess:所有审核通过
			arg:[{startIndex:0},{endIndex:100}]	// [startIndex, endIndex]
		},
		detail:{
			pror_key:'getById',
			showStrArr:[],
			arg:['id']
		},
		/*detail:{
			pror_key:'getByLoginName',
			arg:['loginName']
		},*/
		/*audit:{
			success:{
				pror_key:'auditSuccess',
				arg:['loginName']
			},
			fail:{
				pror_key:'auditFailed',
				arg:['loginName', 'rejectReason']
			}
		},*/
		colModel:[
	        { title: '编号', width: 80, dataType: 'integer', dataIndx: 'id', editable:false,
	    		filter: { type: 'textbox', condition: 'regexp', listeners: ['keyup'] }
	    	},
	        { title: '登录名', minWidth: 150, dataType: 'string', dataIndx: 'loginName', editable:false,
	        	filter: { type: 'textbox', condition: 'regexp', listeners: ['keyup'] }
			},
	        { title: '商户名称', minWidth: 200, dataType: 'string', dataIndx: 'mName', editable:false,
	        	filter: { type: 'textbox', condition: 'regexp', listeners: ['keyup'] }
			},
	        { title: '状态', minWidth: 100, dataType: 'string', align: 'center', dataIndx: 'curStatus', editable:false/*,
	    		filter: { 
	    			align: 'center',
	    			type: 'select',
			        condition: 'equal',
			        prepend: { '': '--Select--' },
			        valueIndx: 'curStatus',
			        labelIndx: 'curStatus',
			        listeners: ['change']
			    }*/
			},
	        { title: '申请时间 (月/日/年)', width: 200, align: 'center', dataIndx: 'applyTime', dataType: 'date', editable:false,
			    filter: { type: 'textbox', condition: 'between', init: pqDatePicker, listeners: ['change'] }
			}
	    ],
	    urlObj:{
	    	url_host: '/yunpay_v2/api/admin/',	//http://aten35.ticp.net:9090/yunpay_v2	肖丽琴http://192.168.1.216:8080
	    	module_key:'merchantapply',
	    	defaultData:{
	    		// 后台必须的参数
	    		'adminLoginName': 'atenPro',
	    		'adminPassword': 2201992,
	    		// terminal  1:加密	2:不加密
	    		'terminal': 2
	    	}
	    }
	    /*,model:{
	    	status:{
	    		transferObj:{
	    			key:'pubStatus',
	    			value:{
	    				1:'已发布',
	    				2:'已结束'
	    			}
	    		}
	    	}
	    }*/
	},
	// 具体模块配置定义
	Config_Grid_Obj : {
		'100_110':{
			type:'merchant_certified',
			detail:{
				showStrArr:['mOrgName','businessScope','mName','mType','loginName','mLicenceNum','curStatus','applyTime','provinceName','cityName','regionName','regionNum','address','picIndex','picIdHold','picIdFront','picIdBack','picMerLicence','picMerOther']
			},
			audit:{
				success:{
					pror_key:'auditSuccess',
					arg:['loginName']
				},
				fail:{
					pror_key:'auditFailed',
					arg:['loginName', 'rejectReason']
				}
			}
		},
		'100_120':{
			type:'merchant_certified',
			grid_title:'审核成功',
			list:{
				pror_key:'listAllSuccess'
			},
			detail:{
				showStrArr:['mOrgName','businessScope','mName','mType','loginName','mLicenceNum','curStatus','auditTime','provinceName','cityName','regionName','regionNum','address','picIndex','picIdHold','picIdFront','picIdBack','picMerLicence','picMerOther']
			},
			urlObj:{
				module_key:'merchantapply',
			}
		},
		'100_130':{
			type:'merchant_certified',
			grid_title:'审核失败',
			list:{
				pror_key:'listAllFailed'
			},
			detail:{
				showStrArr:['mOrgName','businessScope','mName','mType','loginName','mLicenceNum','curStatus','auditTime','provinceName','cityName','regionName','regionNum','address','rejectReason','picIndex','picIdHold','picIdFront','picIdBack','picMerLicence','picMerOther']
			},
			urlObj:{
				module_key:'merchantapply',
			}
		},
		'400_410':{
			grid_title:'未审核',
			type:'merchant_cloud_treasure_apply',
			list:{
				pror_key:'listApply', //listApply:未审核、审核失败	listCreditMerchant:所有审核通过
				arg:[{startIndex:0},{endIndex:20},{status:0}]	// [startIndex, endIndex]
			},
			detail:{
				pror_key:'getCMApplyByLoginName',
				showStrArr:['mName','loginName','curStatus','createTime','amountAll','amountMax','commission','picIndex'],
				arg:['loginName']
			},
			audit:{
				success:{
					pror_key:'auditSuccess',
					arg:['id', 'amountAll', 'amountMax', 'commission']
				},
				fail:{
					pror_key:'auditFailed',
					arg:['id', 'rejectReason']
				}
			},
			colModel:[{},{},{},{},{ title: '申请时间 (月/日/年)', dataIndx: 'createTime'}],
			urlObj:{
				module_key:'creditmerchantapply',
			}
		},
		'400_420':{
			grid_title:'审批成功',
			type:'merchant_cloud_treasure_apply',
			list:{
				pror_key:'listCreditMerchant'
			},
			detail:{
				pror_key:'getCMByLoginName',
				showStrArr:['loginName','applyPerson','curStatus','auditTime','amountAll','amountMax','applyAmount','commission','shouldIncome','actualIncome','picIndex'],
				arg:['loginName']
			},
			colModel:[{},{},{},{},{ title: '审批时间 (月/日/年)', dataIndx: 'auditTime'}],
			urlObj:{
				module_key:'creditmerchantapply',
			}
		},
		'400_430':{
			grid_title:'审批失败',
			type:'merchant_cloud_treasure_apply',
			list:{
				pror_key:'listApply',
				arg:[{startIndex:0},{endIndex:20},{status:2}]
			},
			detail:{
				pror_key:'getCMApplyByLoginName',
				showStrArr:['loginName','curStatus','operationTime','reason'],
				arg:['loginName']
			},
			colModel:[{},{},{},{},{ title: '审批时间 (月/日/年)', dataIndx: 'auditTime'}],
			urlObj:{
				module_key:'creditmerchantapply',
			}
		},
		'500_510':{
			grid_title:'未审核',
			type:'customer_cloud_treasure_apply',
			list:{
				pror_key:'listApply', //listApply:未审核、审核失败	listCreditMerchant:所有审核通过
				arg:[{startIndex:0},{endIndex:20},{status:0}]	// [startIndex, endIndex]
			},
			detail:{
				pror_key:'getUserApplyByLoginName',
				showStrArr:['loginName','nickname','curStatus','auditTime','createTime','amountApply','merLoginName','merApplyMax','merAmountApply','applyMax','amountMax','amountUsed','picIndex'],
				arg:['loginName','merLoginName']
			},
			audit:{
				success:{
					pror_key:'auditSuccess',
					arg:['id', 'amountApply']
				},
				fail:{
					pror_key:'auditFailed',
					arg:['id', 'rejectReason']
				}
			},
			colModel:[{},{},{},{},{ title: '申请时间 (月/日/年)', dataIndx: 'createTime'}],
			urlObj:{
				module_key:'credituserapply',
			}
		},
		'500_520':{
			grid_title:'审批成功',
			type:'customer_cloud_treasure_apply',
			list:{
				pror_key:'listApply',
				arg:[{startIndex:0},{endIndex:20},{status:1}]
			},
			detail:{
				pror_key:'getUserApplyByLoginName',
				showStrArr:['loginName','nickname','curStatus','auditTime','createTime','amountApply','merLoginName','merApplyMax','merAmountApply','applyMax','amountMax','amountUsed','isRelease','releaseTime','picIndex'],
				arg:['loginName','merLoginName']
			},
			colModel:[{},{},{},{},{ title: '审批时间 (月/日/年)', dataIndx: 'createTime'}],
			urlObj:{
				module_key:'credituserapply',
			}
		},
		'500_530':{
			grid_title:'审批失败',
			type:'customer_cloud_treasure_apply',
			list:{
				pror_key:'listApply',
				arg:[{startIndex:0},{endIndex:20},{status:2}]
			},
			detail:{
				pror_key:'getUserApplyByLoginName',
				showStrArr:['loginName','nickname','curStatus','auditTime','reason'],
				arg:['loginName','merLoginName']
			},
			colModel:[{},{},{},{},{ title: '审批时间 (月/日/年)', dataIndx: 'createTime'}],
			urlObj:{
				module_key:'credituserapply',
			}
		},
		'600_610':{
			grid_title:'未审核',
			type:'public_apply',
			list:{
				pror_key:'listAllUnchecked',
				arg:[{startIndex:0},{endIndex:20}]
			},
			detail:{
				pror_key:'getDetail',
				showStrArr:['title','loginName','desc','curStatus','createTime','startTime','endTime','pic1','pic2','pic3','pic4','pic5'],
				arg:['id']
			},
			audit:{
				success:{
					pror_key:'auditSuccess',
					arg:['id']
				},
				fail:{
					pror_key:'auditFailed',
					arg:['id', 'reason']
				}
			},
			colModel:[{},{},{title:'标题',dataIndx:'title'},{},{ title: '创建时间 (月/日/年)', dataIndx: 'createTime'}],
			urlObj:{
				module_key:'publicapply',
			}
		},
		'600_620':{
			grid_title:'审批成功',
			type:'public_apply',
			list:{
				pror_key:'listAllSuccess',
				arg:[{startIndex:0},{endIndex:20}]
			},
			detail:{
				pror_key:'getDetail',
				showStrArr:['loginName','numJoin','desc','cashMax','cashCurrent','pubStatus','createTime','startTime','endTime','pic1','pic2','pic3','pic4','pic5'],
				arg:['id']
			},
			colModel:[{},{},{title:'标题',dataIndx:'title'},{title:'发布状态',dataIndx:'pubStatus'},{ title: '创建时间 (月/日/年)', dataIndx: 'createTime'}],
			urlObj:{
				module_key:'publicapply',
			},
			model:{
		    	status:{
		    		transferObj:{
		    			key:'pubStatus',
		    			value:{
		    				1:'已发布',
		    				2:'已结束'
		    			}
		    		}
		    	}
		    }
		},
		'600_630':{
			grid_title:'审批失败',
			type:'public_apply',
			list:{
				pror_key:'listAllFailed',
				arg:[{startIndex:0},{endIndex:20}]
			},
			detail:{
				pror_key:'getDetail',
				showStrArr:['title','loginName','desc','curStatus','createTime','startTime','endTime','pic1','pic2','pic3','pic4','pic5'],
				arg:['id']
			},
			colModel:[{},{},{title:'标题',dataIndx:'title'},{},{ title: '创建时间 (月/日/年)', dataIndx: 'createTime'}],
			urlObj:{
				module_key:'publicapply',
			}
		}
	}
}
var CONFIG = {
	View_History:[]
};
// 根据默认配置进行整合处理，获得完整配置
function getCompleteConfig(config){
	var Model_Complete_Config = {}, Grid_Complete_Config = {};
	$.each(config.Config_Grid_Obj,function(k,v){
		Grid_Complete_Config[k] = $.extend(true, {}, config.Config_Grid_default, v);
		Grid_Complete_Config[k].urlObj.url_prefix = Grid_Complete_Config[k].urlObj.url_host + Grid_Complete_Config[k].urlObj.module_key + '/';
	})
	$.each(config.Config_Model_Str_Obj, function(k,v){
		Model_Complete_Config[k] = {};
		$.each(v,function(l,w){
			Model_Complete_Config[k][l] = $.extend(true, {}, config.Config_Model_default, w);
		})
	})
	return {
		Grid_Complete_Config  : Grid_Complete_Config,
		Model_Complete_Config : Model_Complete_Config
	}
}
// 根据左侧菜单处理得到"当前"子模块的相应配置
function getCurrentConfig(tree_id){
	if(!CONFIG.Grid_Complete_Config || !CONFIG.Model_Complete_Config){
		CONFIG = $.extend(true, CONFIG, getCompleteConfig(Default_Config));
	}

	var historyLen = CONFIG.View_History.length;
	if(historyLen > 0 && tree_id == CONFIG.View_History[historyLen - 1]){
		return CONFIG;
	}
	var Current_Grid_Config = $.extend(true, {}, CONFIG.Grid_Complete_Config[tree_id]);

	var Current_Model_Config = $.extend(true, {}, CONFIG.Model_Complete_Config[Current_Grid_Config.type]);
	// 接口特殊字段处理
	if(Current_Grid_Config.model){
		$.each(Current_Grid_Config.model,function(k,v){
			 $.extend(Current_Model_Config[k], v);
		})
	}

	CONFIG.View_History.push(tree_id);

	return $.extend(CONFIG, {
		Current_Grid_Config  : Current_Grid_Config,
		Current_Model_Config : Current_Model_Config
	});
}
