import { CacheGetter, ChannelGetter, MemberGetter } from "./slack"

var token = process.env.SLACK_API_TOKEN || '';
var channelName = process.env.CHANNEL_NAME || '';
var memberName = process.env.MEMBER_NAME || '';

var WebClient = require('@slack/client').WebClient;

var client = new WebClient(token);


CacheGetter.create<ChannelGetter>(ChannelGetter, client)
.then((channelGetter) => {
    var channel = channelGetter.getByName(channelName);
    console.log(channel);
}).catch(reason => console.log(reason));

CacheGetter.create<MemberGetter>(MemberGetter, client)
.then((memberGetter) => {
    var member = memberGetter.getByName(memberName);
    console.log(member);
}).catch(reason => console.log(reason));
