<template>
	<view class="Lmain">
		<veiw class="LloginAndAppNameWrapper">
			<image :src="logo" />
			<view>{{appName}}</view>
		</veiw>
		<view class="loginButtonWrapper">
			<button
				type="default"
				class="buttonRender"
				size="default"
				@getuserinfo="onLogin"
				open-type="getUserInfo"
				lang="zh_CN"
			>
				<image src="/static/images/wechat.svg" class="wechatIconRender" />
				微信登录
			</button>
		</view>
		<view class='tipWrapper'> 登录即代表同意 <text class="clauseRender" > 《隐私政策》 </text> 和 <text class="clauseRender"> 《用户服务协议》</text> </view>
		<quick-message ref="message" />
	</view>
</template>

<script>
	import {authentication} from "../../services/authentication";
	import message from '@/components/quick-message/quick-message.vue'
	import {themeColor} from "../../utils/Config";
	import {fetchOne} from "../../services/config";
	import {getConfigBykey} from "../../utils/common";

	export default {
		components: {
			message
		},
		data() {
			return {
				nextPage: undefined,
				themeColor,
				logo: undefined,
				appName: undefined
			}
		},
		methods: {
			// 显示提示消息
			showMessage(params) { //显示message
				this.$refs.message.show({
					type:'default', //String 默认default
					msg: params, //String 显示内容 *
					direction:'top', //String 默认顶部显示
					icon:true, //Boolean|String 显示icon(false/true/string 默认显示icon)
					mask: false, //Boolean 遮罩（默认false没有遮罩）
					time:5000, //Number|Boolean 默认3000/false为不自动关闭
					iconSize: 10, //Number 自定义icon大小(单位px 默认16 设置后会覆盖自定义样式里的设置优先级最高)
					iconColor: this.themeColor
				})
			},
			onLogin(res)
			{
				const { avatarUrl, city, country, gender, language, nickName, province } = res.detail.userInfo;
				(new Promise((resolve) => {
					uni.login({
						success: (res) => {
							const {code} = res;
							resolve(code);
						}
					})
				})).then(code => {
					const newParams = {code, avatarUrl, city, country, gender, language, nickName, province }
					authentication(newParams).then(() => {
						this.showMessage('登录成功!')
                        const redirect = () => {
							if (this.nextPage) {
								// 回去指定的页面
								uni.navigateTo({
									url: this.nextPage,
								});
							} else {
								// 返回原来页面
								uni.navigateBack({
									delta: 1
								})
							}
						}
						setTimeout(() => {
							redirect();
						}, 1000)
					});
				})
			}
		},
		created() {
			fetchOne('APP_LOGO').then(res => {
				const {url} = res.data;
				this.logo = url;
			});
			getConfigBykey('APP_NAME').then(appName => {
				this.appName = appName;
			});
			uni.setNavigationBarTitle({title: '用户登录'});
		},
		onLoad(option) {
			if (option.nextPage) this.nextPage = option.nextPage;
		}
	}
</script>

<style lang="scss">
	@import "../../uni";
	.Lmain {
		width: 100%;
		display: flex;
		flex-direction: column;
        .LloginAndAppNameWrapper {
			margin-top: 110upx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			view {
				margin-top: 10upx;
			}
            image {
				width: 300upx;
				height: 300upx;
			}
			font-size: .9rem;
		}
		.loginButtonWrapper {
			margin-top: 110upx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
            border-radius: 10%;
			button {
				background-color: $theme-color;
				color: #fff;
				font-size: .9rem;
				margin-top: 1rem;
				width: 500upx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				.wechatIconRender {
					margin-right: 10upx;
					display: inline-block;
					height: .9rem;
					width: .9rem;
				}
			}
		}
		.tipWrapper {
            margin-top: 20upx;
            text-align: center;
			font-size: .6rem;
			.clauseRender {
				color: $theme-color ;
			}
		}
		background-color: white;
		height: 100vh;
	}
</style>
