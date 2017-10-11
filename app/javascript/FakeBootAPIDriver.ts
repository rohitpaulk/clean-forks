import { FakeBootAPI, Stage } from "./FakeBootAPI";

let initFakeBootAPI = function(seconds_between_stages: number) {
    let api = new FakeBootAPI("dummy_url");

    let ms_between_stages = 1000 * seconds_between_stages;

    setTimeout(() => {
        api.setStage(Stage.I);
    }, ms_between_stages);

    setTimeout(() => {
        api.setStage(Stage.II);
    }, 2 * ms_between_stages);

    setTimeout(() => {
        api.setStage(Stage.III);
    }, 3 * ms_between_stages);

    setTimeout(() => {
        api.setStage(Stage.IV);
    }, 4 * ms_between_stages);

    return api;
};

export { initFakeBootAPI };
