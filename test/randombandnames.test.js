"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("@aws-cdk/assert");
const cdk = require("@aws-cdk/core");
const Randombandnames = require("../lib/randombandnames-stack");
const Lambda = require("../resources/bandnames");
test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Randombandnames.RandombandnamesStack(app, 'BandNames');
    // THEN
    // expectCDK(stack).to(matchTemplate({
    //   "Resources": {}
    // }, MatchStyle.EXACT))
    assert_1.expect(stack);
});
test('Lambda returns Tim woz ere', () => {
    expect.assertions(1);
    const expectedResponse = { "body": JSON.stringify(["Tim woz ere", "Tim is still here"]), "headers": {}, "isBase64Encoded": false, "statusCode": 200 };
    return expect(Lambda.handler()).resolves.toHaveBeenCalled();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZG9tYmFuZG5hbWVzLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyYW5kb21iYW5kbmFtZXMudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUFpRjtBQUNqRixxQ0FBcUM7QUFDckMsZ0VBQWlFO0FBQ2pFLGlEQUFpRDtBQUVqRCxJQUFJLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRTtJQUNyQixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMxQixPQUFPO0lBQ1AsTUFBTSxLQUFLLEdBQUcsSUFBSSxlQUFlLENBQUMsb0JBQW9CLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3pFLE9BQU87SUFDUCxzQ0FBc0M7SUFDdEMsb0JBQW9CO0lBQ3BCLHdCQUF3QjtJQUV4QixlQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDckIsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO0lBQ3RDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckIsTUFBTSxnQkFBZ0IsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsYUFBYSxFQUFFLG1CQUFtQixDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFDLENBQUM7SUFDckosT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUM7QUFDOUQsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleHBlY3QgYXMgZXhwZWN0Q0RLLCBtYXRjaFRlbXBsYXRlLCBNYXRjaFN0eWxlIH0gZnJvbSAnQGF3cy1jZGsvYXNzZXJ0JztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCBSYW5kb21iYW5kbmFtZXMgPSByZXF1aXJlKCcuLi9saWIvcmFuZG9tYmFuZG5hbWVzLXN0YWNrJyk7XG5pbXBvcnQgTGFtYmRhID0gcmVxdWlyZSgnLi4vcmVzb3VyY2VzL2JhbmRuYW1lcycpXG5cbnRlc3QoJ0VtcHR5IFN0YWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG4gICAgLy8gV0hFTlxuICAgIGNvbnN0IHN0YWNrID0gbmV3IFJhbmRvbWJhbmRuYW1lcy5SYW5kb21iYW5kbmFtZXNTdGFjayhhcHAsICdCYW5kTmFtZXMnKTtcbiAgICAvLyBUSEVOXG4gICAgLy8gZXhwZWN0Q0RLKHN0YWNrKS50byhtYXRjaFRlbXBsYXRlKHtcbiAgICAvLyAgIFwiUmVzb3VyY2VzXCI6IHt9XG4gICAgLy8gfSwgTWF0Y2hTdHlsZS5FWEFDVCkpXG5cbiAgICBleHBlY3RDREsoc3RhY2spO1xufSk7XG5cbnRlc3QoJ0xhbWJkYSByZXR1cm5zIFRpbSB3b3ogZXJlJywgKCkgPT4ge1xuICBleHBlY3QuYXNzZXJ0aW9ucygxKTtcbiAgY29uc3QgZXhwZWN0ZWRSZXNwb25zZSA9IHsgXCJib2R5XCI6IEpTT04uc3RyaW5naWZ5KFtcIlRpbSB3b3ogZXJlXCIsIFwiVGltIGlzIHN0aWxsIGhlcmVcIl0pLCBcImhlYWRlcnNcIjoge30sIFwiaXNCYXNlNjRFbmNvZGVkXCI6IGZhbHNlLCBcInN0YXR1c0NvZGVcIjogMjAwfTtcbiAgcmV0dXJuIGV4cGVjdChMYW1iZGEuaGFuZGxlcigpKS5yZXNvbHZlcy50b0hhdmVCZWVuQ2FsbGVkKCk7XG59KTtcbiJdfQ==